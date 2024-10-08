import { CommonComponentProps } from '../../../types';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';

function Page({ id, children, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);
  return (
    <div
      ref={drop}
      data-component-id={id}
      className={`p-5 h-full box-border ${
        canDrop ? 'border-2 border-solid border-blue-400' : ''
      }`}
      style={styles}
    >
      {children}
    </div>
  );
}

export default Page;
