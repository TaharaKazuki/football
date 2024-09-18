import getStandings from './util/getStandings';
import { Standing } from '@/types';

export default async function Home() {
  const standingsData: Standing[] = await getStandings();
  console.info('standingsData', standingsData);
  return <div></div>;
}
