import { useMemo } from 'react';
import { useComponentConfigStore } from '../../stores/useComponentsConfigStore';
import { MaterialItem } from './MaterialAreaItem';

export function MaterialArea() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig).filter((c) => c.name !== 'Page');
  }, [componentConfig]);

  return (
    <div>
      {components.map((item, i) => {
        return (
          <MaterialItem name={item.name} key={item.name + i} desc={item.desc} />
        );
      })}
    </div>
  );
}
