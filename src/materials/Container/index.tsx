import { useDrop } from 'react-dnd';
import { CommonComponentProps } from '../../../types';
import { useComponentConfigStore } from '../../stores/useComponentsConfigStore';
import { useComponetsStore } from '../../stores/useComponetsStore';

const Container = ({ id, children }: CommonComponentProps) => {
  const { addComponent } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ['Button', 'Container'],
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      const props = componentConfig[item.type].defaultProps;

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id,
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div
      ref={drop}
      className={`border border-black min-h-25 p-5 ${
        canDrop ? 'border-2 border-solid border-blue-400' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
