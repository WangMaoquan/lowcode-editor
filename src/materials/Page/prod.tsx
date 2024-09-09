import { CommonComponentProps } from '../../../types';

function Page({ children, styles }: CommonComponentProps) {
  return (
    <div className="p-5" style={styles}>
      {children}
    </div>
  );
}

export default Page;
