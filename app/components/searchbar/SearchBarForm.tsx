'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Team } from '@/types';

type SearchBarFormProps = {
  teamsData: Team[];
};

const SearchBarForm = ({ teamsData }: SearchBarFormProps) => {
  const [searchTeam, setSearchTeam] = useState<string>('');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [showFilteredBox, setShowFilteredBox] = useState<boolean>(false);

  const router = useRouter();

  const filteredTeams = teamsData.filter((team) =>
    team.team.name.toLocaleLowerCase().includes(searchTeam.toLocaleLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTeam(e.target.value);
    setFocusedIndex(-1);
    setShowFilteredBox(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      let length = 0;
      if (filteredTeams.length > 10) {
        length = 10;
      } else {
        length = filteredTeams.length;
      }
      console.log(focusedIndex);
      setFocusedIndex((prevIndex) =>
        prevIndex < length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === 'Enter') {
      if (focusedIndex !== -1) {
        const teamId = filteredTeams[focusedIndex].team.id;
        router.push(`/team/${teamId}`);
        setSearchTeam('');
      }
    }
  };

  const handleTeamItemClick = () => setSearchTeam('');

  const teamListRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      teamListRef.current &&
      !teamListRef.current.contains(event.target as Node)
    ) {
      setShowFilteredBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative flex w-full max-w-lg items-center justify-center">
      <input
        type="text"
        value={searchTeam}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a team"
        className="w-full rounded-full border border-neutral-100/10
                bg-transparent bg-gradient-to-r from-neutral-100/10 to-black/25 px-4 py-1.5
                text-neutral-100/80 outline-none
                transition-all duration-300 placeholder:text-neutral-100/30 hover:border-yellow-200 focus:border-yellow-200 focus:from-yellow-200/40"
      />
      {searchTeam && filteredTeams.length > 0 && showFilteredBox ? (
        <div
          ref={teamListRef}
          className="absolute left-2 top-full z-20 flex w-full
                        max-w-md flex-col bg-black/80"
        >
          {filteredTeams.slice(0, 10).map((standing, i) => (
            <Link
              href={`/team/${standing.team.id}`}
              key={standing.team.id}
              className={`p-2 text-neutral-100 ${
                i === focusedIndex ? 'bg-neutral-100/40' : ''
              }`}
              onClick={() => handleTeamItemClick()}
            >
              {standing.team.name}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBarForm;
