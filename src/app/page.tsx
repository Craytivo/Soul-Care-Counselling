import Hero from '../components/Hero'
import { getTeamMembers, getHomePage } from '../lib/sanity-queries'
import HomeClient from './HomeClient'

export default async function Home() {
  const [teamMembers, homePageData] = await Promise.all([
    getTeamMembers(),
    getHomePage()
  ]);
  
  return <HomeClient teamMembers={teamMembers} homePageData={homePageData} />;
}
