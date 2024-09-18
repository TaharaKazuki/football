import Link from 'next/link';
import React from 'react';

import SearchBarForm from './SearchBarForm';
import getTeams from '@/app/util/getTeams';
import { Team } from '@/types';

const SearchBar = async () => {
  let teamsData: Team[] = await getTeams();

  return (
    <div className="flex w-full items-start justify-center p-3">
      <div className="flex w-1/6 items-center justify-center text-neutral-100">
        <Link href="/" className="flex items-center justify-center">
          <h1 className="hidden px-2 text-xl font-bold md:block">LFB News</h1>
        </Link>
      </div>
      <div className="flex w-4/6 items-center justify-center">
        <SearchBarForm teamsData={teamsData} />
      </div>
      <div className="w-1/6"></div>
    </div>
  );
};

export default SearchBar;
