import { useEffect } from 'react';
import { useComponentConfigStore } from '../../stores/useComponentsConfigStore';
import { Component, useComponetsStore } from '../../stores/useComponetsStore';
import React from 'react';

export function EditArea() {
  const { components, addComponent } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    addComponent(
      {
        id: 222,
        name: 'Container',
        props: {},
        children: [],
      },
      1,
    );

    addComponent(
      {
        id: 333,
        name: 'Button',
        props: {
          text: '无敌',
        },
        children: [],
      },
      222,
    );
  }, []);
  console.log(components);

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
