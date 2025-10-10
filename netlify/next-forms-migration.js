// Netlify Next.js Forms migration helper
// See https://ntl.fyi/next-runtime-forms-migrat for details

module.exports = async function nextFormsMigration({ utils }) {
  // This file is required for Netlify Forms support with @netlify/plugin-nextjs@5+
  // It should be committed to your repo at netlify/next-forms-migration.js
  // No custom logic is needed unless you want to customize form handling
  utils.status.show({
    title: 'Netlify Next.js Forms migration',
    summary: 'Migration file present for Netlify Forms support.'
  })
}
