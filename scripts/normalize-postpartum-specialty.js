import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL',
  apiVersion: '2025-09-05'
});

async function normalizePostpartumSpecialty() {
  try {
    const correct = 'Postpartum Mental Health';
    const regex = /postpartum mental health/i;
    const members = await client.fetch(`*[_type == "teamMember" && specialties match '*postpartum*']{_id, name, specialties}`);
    let updated = 0;
    for (const member of members) {
      if (!member.specialties) continue;
      const newSpecialties = member.specialties.map(s => regex.test(s) ? correct : s.trim());
      if (JSON.stringify(newSpecialties) !== JSON.stringify(member.specialties)) {
        try {
          await client.patch(member._id).set({ specialties: newSpecialties }).commit();
          console.log(`Updated specialties for ${member.name}`);
          updated++;
        } catch (err) {
          console.error(`Failed to update ${member.name}:`, err && err.message ? err.message : err);
        }
      }
    }
    console.log(`\nDone. Updated ${updated} team members.`);
    process.exit(0);
  } catch (err) {
    console.error('Script failed:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

normalizePostpartumSpecialty();
