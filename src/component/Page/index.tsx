import { useDrop } from 'react-dnd';
import { useComponetsStore } from '../../stores/useComponetsStore';
import { useComponentConfigStore } from '../../stores/useComponentsConfigStore';
import { CommonComponentProps } from '../../../types';

function Page({ id, children }: CommonComponentProps) {
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
      console.log(id);

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
      className={`p-5 h-full box-border ${
        canDrop ? 'border-2 border-solid border-blue-400' : ''
      }`}
    >
      {children}
    </div>
  );
}

export default Page;
