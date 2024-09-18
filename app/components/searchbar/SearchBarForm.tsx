const SearchBarForm = () => {
  return (
    <div className="relative flex w-full max-w-lg items-center justify-center">
      <input
        type="text"
        placeholder="Search for a team"
        className="w-full rounded-full border border-neutral-100/10
                bg-transparent bg-gradient-to-r from-neutral-100/10 to-black/25 px-4 py-1.5
                text-neutral-100/80 outline-none
                transition-all duration-300 placeholder:text-neutral-100/30 hover:border-yellow-200 focus:border-yellow-200 focus:from-yellow-200/40"
      />
    </div>
  );
};

export default SearchBarForm;
