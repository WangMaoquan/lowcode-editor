import { PropsWithChildren } from 'react';

const Container = ({ children }: PropsWithChildren) => {
  return <div className="border border-black min-h-25 p-5">{children}</div>;
};

export default Container;
