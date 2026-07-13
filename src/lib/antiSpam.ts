const RATE_LIMIT_WINDOW_MS = 60_000
const MAX_SUBMISSIONS_PER_WINDOW = 5
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for') || ''
  const realIp = request.headers.get('x-real-ip') || ''
  const ip = (forwarded.split(',')[0] || realIp || 'unknown').trim()
  return ip || 'unknown'
}

export function checkForSpam(fields: Record<string, string>, request: Request) {
  const honeypotValue = [fields.company, fields.website, fields.url, fields.fax]
    .map((value) => value?.trim())
    .find(Boolean)

  if (honeypotValue) {
    return { blocked: true, reason: 'honeypot' as const }
  }

  const startedAt = Number(fields['form-start-time'] || '')
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 3000) {
    return { blocked: true, reason: 'too-fast' as const }
  }

  const clientIp = getClientIp(request)
  const now = Date.now()
  const bucket = rateLimitBuckets.get(clientIp)

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  } else {
    bucket.count += 1
    if (bucket.count > MAX_SUBMISSIONS_PER_WINDOW) {
      return { blocked: true, reason: 'rate-limit' as const }
    }
  }

  const allText = Object.values(fields).join(' ').toLowerCase()
  const suspiciousLinkCount = (allText.match(/https?:\/\/|www\./g) || []).length

  if (suspiciousLinkCount > 2) {
    return { blocked: true, reason: 'suspicious-links' as const }
  }

  return { blocked: false, reason: null }
}
