import { useComponentConfigStore } from '../../stores/useComponentsConfigStore';
import { Component, useComponetsStore } from '../../stores/useComponetsStore';
import React, { MouseEventHandler, useState } from 'react';
import HoverMask from '../HoverMask';

export function EditArea() {
  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();
  const [hoverComponentId, setHoverComponentId] = useState<number>();

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

  const handleMouseOver: MouseEventHandler = (e) => {
    // e.nativeEvent 获取原生事件
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      // 获取元素dataset
      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

  return (
    <div
      className="h-full edit-area"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => {
        setHoverComponentId(undefined);
      }}
    >
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
      {hoverComponentId && (
        <HoverMask
          componentId={hoverComponentId}
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
