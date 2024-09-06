import { CommonComponentProps } from '../../../types';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';

const Container = ({ id, children }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);
  return (
    <div
      ref={drop}
      data-component-id={id}
      className={`border border-black min-h-25 p-5 ${
        canDrop ? 'border-2 border-solid border-blue-400' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
