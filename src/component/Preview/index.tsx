/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Component, useComponetsStore } from '../../stores/useComponetsStore';
import { useComponentConfigStore } from '../../stores/useComponentsConfigStore';
import { message } from 'antd';
import { GoToLinkConfig } from '../SettingArea/ComponentEvent/actions/GoToLink';
import { ShowMessageConfig } from '../SettingArea/ComponentEvent/actions/ShowMessage';

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
        props[event.name] = () => {
          eventConfig?.actions?.forEach(
            (action: GoToLinkConfig | ShowMessageConfig) => {
              if (action.type === 'goToLink') {
                window.location.href = action.url;
              } else if (action.type === 'showMessage') {
                if (action.config.type === 'success') {
                  message.success(action.config.text);
                } else if (action.config.type === 'error') {
                  message.error(action.config.text);
                }
              }
            },
          );
        };
      }
    });
    return props;
  }

  return <div>{renderComponents(components)}</div>;
}
