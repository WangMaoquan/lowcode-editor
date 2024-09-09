import { Tree } from 'antd';
import {
  Component,
  useComponetsStore,
} from '../../../stores/useComponetsStore';
import { DataNode } from 'antd/es/tree';

export function Outline() {
  const { components, setCurComponentId } = useComponetsStore();

  const transformTree: (components: Component[]) => DataNode[] = (
    components,
  ) => {
    return components.map((c) => ({
      ...c,
      key: c.id,
      children: transformTree(c.children || []),
    }));
  };

  return (
    <Tree
      fieldNames={{ title: 'desc' }}
      treeData={transformTree(components)}
      showLine
      defaultExpandAll
      onSelect={([selectedKey]) => {
        setCurComponentId(selectedKey as number);
      }}
    />
  );
}
