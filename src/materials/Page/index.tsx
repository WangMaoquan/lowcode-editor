import { PropsWithChildren } from 'react';

function Page({ children }: PropsWithChildren) {
  return <div className="p-5 h-full box-border">{children}</div>;
}

export default Page;
