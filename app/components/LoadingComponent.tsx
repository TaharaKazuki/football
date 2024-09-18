'use client';

import { RotateLoader } from 'react-spinners';

const LoadingComponent = ({ color }: { color: string }) => {
  return (
    <div>
      <RotateLoader color={color} size={30} />
    </div>
  );
};

export default LoadingComponent;
