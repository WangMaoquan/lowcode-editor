import { useDrag } from 'react-dnd';

export interface MaterialItemProps {
  name: string;
}

export function MaterialItem(props: MaterialItemProps) {
  const { name } = props;

  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
  });

  return (
    <div
      ref={drag}
      className="border-dashed border border-black py-2 px-[0.625rem]  m-[0.625rem] cursor-move inline-block  bg-white hover:bg-gray-500"
    >
      {name}
    </div>
  );
}
