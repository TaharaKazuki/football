import 'server-only';
// import { getMonth, getYear } from 'date-fns';

import getStandingsSample from '../sampleData/getStandingsSample';
import { USE_SAMPLE } from '../sampleData/useSample';
import { Standing } from '@/types';

const getStandings = async (): Promise<Standing[]> => {
  if (USE_SAMPLE) {
    return getStandingsSample();
  }

  /*
   * free planでは2020〜2022シーズンでしかrequestできないので
   * 一旦、コメントアウト 無念
   */

  // const currentTime = new Date();
  // const month = getMonth(currentTime);
  // let _year;
  // if (month <= 6) {
  //   _year = getYear(currentTime) - 1;
  // } else {
  //   _year = getYear(currentTime);
  // }

  const API_KEY: string = process.env.API_KEY as string;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io',
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const standings: Standing[] = [];

  const leagues = [
    { name: 'EPL', id: 39 },
    { name: 'La Liga', id: 140 },
    { name: 'BundesLiga', id: 78 },
    { name: 'Serie A', id: 135 },
    { name: 'Ligue1', id: 61 },
  ];

  for (const league of leagues) {
    let url = `https://v3.football.api-sports.io/standings?league=${
      league.id
    }&season=${2022}`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const standing = data.response[0];

      if (standing) {
        standings.push(standing);
      }
    } catch (error) {
      console.error(`Error fetching ${league.name} standings: ${error}`);
      throw error;
    }
  }
  return standings;
};

export default getStandings;
