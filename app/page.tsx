import StandingsAndFixtures from './components/home/StandingsAndFixtures';
import getStandings from './util/getStandings';
import { Standing } from '@/types';

export default async function Home() {
  const standingsData: Standing[] = await getStandings();

  return (
    <div className="flex w-full flex-col items-center justify-center md:p-10">
      <StandingsAndFixtures standingsData={standingsData} />
    </div>
  );
}
