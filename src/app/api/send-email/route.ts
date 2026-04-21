import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'Email service is not configured. Missing BREVO_API_KEY.' },
        { status: 500 }
      )
    }
    const to = process.env.CONTACT_EMAIL
    if (!to) {
      return NextResponse.json(
        { message: 'Email service is not configured. Missing CONTACT_EMAIL.' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const fields: Record<string, string> = {}
    const attachments: Array<{
      content: string
      filename: string
      type: string
      disposition: 'attachment'
    }> = []

    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        fields[key] = value
        continue
      }

      if (value instanceof File) {
        if (!value.size) continue
        const buffer = Buffer.from(await value.arrayBuffer())
        const safeFilename = (value.name || `${key}.bin`).replace(/[^a-zA-Z0-9._-]/g, '_')

        fields[key] = `[file] ${safeFilename} (${value.type || 'application/octet-stream'}, ${value.size} bytes)`
        attachments.push({
          content: buffer.toString('base64'),
          filename: safeFilename,
          type: value.type || 'application/octet-stream',
          disposition: 'attachment',
        })
      }
    }

    const senderEmail =
      process.env.BREVO_SENDER_EMAIL ||
      process.env.SENDGRID_FROM ||
      process.env.CONTACT_EMAIL ||
      'no-reply@example.com'
    const senderName = process.env.BREVO_SENDER_NAME || 'Soul Care'
    const timestamp = new Date().toISOString()
    const formName = fields.subject || fields.form || fields['form-name'] || 'Website form'

    const textLines: string[] = [
      'New form submission',
      `Timestamp: ${timestamp}`,
      '',
      ...Object.entries(fields).map(([k, v]) => `${k}: ${v}`),
    ]

    const htmlLines: string[] = [
      '<!doctype html><html><head><meta charset="utf-8"/></head><body style="font-family:Arial,Helvetica,sans-serif;color:#23201B;background:#F8F5EC;padding:18px;">',
      '<div style="max-width:680px;margin:0 auto;padding:20px;background:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.06)">',
      '<div style="background:#C49A6C;padding:14px 16px;border-radius:6px;color:#ffffff"><h2 style="margin:0;font-size:18px">Soul Care - New form submission</h2></div>',
      `<div style="margin-top:12px"><strong>Timestamp:</strong> ${escapeHtml(timestamp)}</div>`,
    ]

    for (const [k, v] of Object.entries(fields)) {
      htmlLines.push(
        `<div style="padding:12px 0;border-bottom:1px solid #f1ede6"><div style="font-weight:700;color:#6E4B3A;margin-bottom:6px">${escapeHtml(
          k
        )}</div><div style="color:#23201B;white-space:pre-wrap">${escapeHtml(v)}</div></div>`
      )
    }

    htmlLines.push('</div></body></html>')

    const brevoPayload: Record<string, unknown> = {
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: [{ email: to }],
      subject: `New form submission - ${formName}`,
      textContent: textLines.join('\n'),
      htmlContent: htmlLines.join(''),
      ...(fields.email ? { replyTo: { email: fields.email } } : {}),
    }
    if (attachments.length > 0) {
      brevoPayload.attachment = attachments.map((file) => ({
        name: file.filename,
        content: file.content,
      }))
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(brevoPayload),
    })

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '')
      console.error('Brevo send error:', response.status, errorBody)

      let providerMessage = 'Email provider rejected the request.'
      try {
        const parsed = JSON.parse(errorBody) as { message?: string }
        if (parsed?.message) providerMessage = parsed.message
      } catch {
        if (errorBody) providerMessage = errorBody
      }

      return NextResponse.json(
        { message: `Error sending email: ${providerMessage}` },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('send-email route error:', error)
    const details =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Unknown server error.'
    return NextResponse.json({ message: `Error sending email: ${details}` }, { status: 502 })
  }
}
