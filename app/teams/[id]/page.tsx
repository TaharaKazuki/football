type TeamProps = {
  params: {
    id: string;
  };
};

const Team = ({ params }: TeamProps) => {
  return (
    <div className="flex justify-center items-center text-neutral-100">
      {params.id}
    </div>
  );
};

export default Team;
