import { CommonComponentProps } from '../../../types';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';

function Page({ id, children }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);
  return (
    <div
      ref={drop}
      className={`p-5 h-full box-border ${
        canDrop ? 'border-2 border-solid border-blue-400' : ''
      }`}
    >
      {children}
    </div>
  );
}

export default Page;
