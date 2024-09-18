// SearchBarForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';

import ForwardRefLink from '../ForwardRefLink'; // カスタムリンクコンポーネントをインポート
import { Team } from '@/types';

type SearchBarFormProps = {
  teamsData: Team[];
};

const SearchBarForm = ({ teamsData }: SearchBarFormProps) => {
  const [searchTeam, setSearchTeam] = useState<string>('');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [showFilteredBox, setShowFilteredBox] = useState<boolean>(false);
  const router = useRouter();
  const teamListRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]); // 各項目のRefを保持

  // フィルタリング処理をuseMemoで最適化
  const filteredTeams = useMemo(
    () =>
      teamsData.filter((team) =>
        team.team.name.toLowerCase().includes(searchTeam.toLowerCase())
      ),
    [searchTeam, teamsData]
  );

  // イベントハンドラをuseCallbackで最適化
  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTeam(e.target.value);
    setFocusedIndex(-1);
    setShowFilteredBox(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const length = filteredTeams.length;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex < length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === 'Enter' && focusedIndex !== -1) {
        const teamId = filteredTeams[focusedIndex].team.id;
        router.push(`/team/${teamId}`);
        setSearchTeam('');
        setShowFilteredBox(false);
      } else if (event.key === 'Escape') {
        // Escapeキーでフィルタリングボックスを閉じる
        setShowFilteredBox(false);
      }
    },
    [filteredTeams, focusedIndex, router]
  );

  const handleTeamItemClick = useCallback(() => {
    setSearchTeam('');
    setShowFilteredBox(false);
  }, []);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      teamListRef.current &&
      !teamListRef.current.contains(event.target as Node)
    ) {
      setShowFilteredBox(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // focusedIndexが変更されたときにスクロールを実行
  useEffect(() => {
    if (focusedIndex !== -1 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [focusedIndex]);

  const shouldShowFilteredBox =
    searchTeam && filteredTeams.length > 0 && showFilteredBox;

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
      {shouldShowFilteredBox && (
        <div
          ref={teamListRef}
          className="absolute top-full z-20 flex w-full max-w-full flex-col overflow-y-auto bg-black/80"
          style={{ maxHeight: '200px' }} // スクロールを許可する最大の高さを設定
          role="listbox" // アクセシビリティ向上のためのrole属性
        >
          {filteredTeams.map((standing, i) => (
            <ForwardRefLink
              href={`/team/${standing.team.id}`}
              key={standing.team.id}
              ref={(el: HTMLAnchorElement | null) => {
                itemRefs.current[i] = el;
              }} // Refを<a>タグに割り当て（ブロックボディに変更）
              className={`p-2 text-neutral-100 hover:bg-yellow-100/40 ${
                i === focusedIndex ? 'bg-yellow-100/40' : ''
              }`}
              onClick={handleTeamItemClick}
              role="option" // アクセシビリティ向上のためのrole属性
              aria-selected={i === focusedIndex} // 選択状態を示す属性
            >
              {standing.team.name}
            </ForwardRefLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarForm;
