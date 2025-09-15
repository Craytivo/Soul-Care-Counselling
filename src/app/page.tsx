import Hero from '../components/Hero'
import { getTeamMembers } from '../lib/sanity-queries'
import HomeClient from './HomeClient'

export default async function Home() {
  const teamMembers = await getTeamMembers();
  return <HomeClient teamMembers={teamMembers} />;
}
