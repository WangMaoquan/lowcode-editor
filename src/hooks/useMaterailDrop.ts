import { useDrop } from 'react-dnd';
import { useComponetsStore } from '../stores/useComponetsStore';
import { useComponentConfigStore } from '../stores/useComponentsConfigStore';

export function useMaterailDrop(accept: string[], id: number) {
  const { addComponent } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      const config = componentConfig[item.type];

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props: config.defaultProps,
          desc: config.desc,
        },
        id,
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, drop };
}
