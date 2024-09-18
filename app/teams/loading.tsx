import LoadingComponent from '../components/LoadingComponent';

const Loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <LoadingComponent color={'#A38F54'} />
    </div>
  );
};

export default Loading;
