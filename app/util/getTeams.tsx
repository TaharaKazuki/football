import 'server-only';

import getStandings from './getStandings';
import { Standing, Team } from '@/types';

const getTeams = async (): Promise<Team[]> => {
  try {
    const standings: Standing[] = await getStandings();

    // 記事にする
    const teams = standings.flatMap((league) => {
      if (!Array.isArray(league.league.standings)) {
        throw new Error('Invalid standings data');
      }
      return league.league.standings.flat();
    });

    return teams;
  } catch (error) {
    console.error('Error occur while fetching teams: ', error);
    throw error;
  }
};

export default getTeams;
