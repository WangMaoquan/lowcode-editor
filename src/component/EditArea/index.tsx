import { useComponentConfigStore } from '../../stores/useComponentsConfigStore';
import { Component, useComponetsStore } from '../../stores/useComponetsStore';
import React from 'react';

export function EditArea() {
  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.component) {
        return null;
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || []),
      );
    });
  }

  return (
    <div className="h-full">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
    </div>
  );
}
