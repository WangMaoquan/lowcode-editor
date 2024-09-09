/* eslint-disable @typescript-eslint/no-explicit-any */
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
          ...handleEvent(component),
        },
        renderComponents(component.children || []),
      );
    });
  }

  function handleEvent(component: Component) {
    const props: Record<string, any> = {};

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      // 定义了事件
      if (eventConfig) {
        const { type } = eventConfig;

        // props["onClick"] = () => {/** todo */}
        props[event.name] = () => {
          if (type === 'goToLink' && eventConfig.url) {
            window.location.href = eventConfig.url;
          }
        };
      }
    });
    return props;
  }

  return <div>{renderComponents(components)}</div>;
}
