import React from 'react';
import { Component, useComponetsStore } from '../../stores/useComponetsStore';
import { useComponentConfigStore } from '../../stores/useComponentsConfigStore';

export function Preview() {
  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.prod) {
        return null;
      }

      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || []),
      );
    });
  }

  return <div>{renderComponents(components)}</div>;
}
