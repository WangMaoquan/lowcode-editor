import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  getComponentById,
  useComponetsStore,
} from '../../stores/useComponetsStore';
import { Dropdown, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface SelectedMaskProps {
  portalWrapperClassName: string;
  containerClassName: string;
  componentId: number;
}

function SelectedMask({
  containerClassName,
  portalWrapperClassName,
  componentId,
}: SelectedMaskProps) {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  const { components, curComponentId, deleteComponent, setCurComponentId } =
    useComponetsStore();

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  function updatePosition() {
    if (!componentId) return;

    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();

    let labelTop = top - containerTop + container.scrollTop;
    const labelLeft = left - containerLeft + width;

    if (labelTop <= 0) {
      labelTop -= -20;
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      labelTop,
      labelLeft,
    });
  }

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`)!;
  }, []);

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  function handleDelete() {
    deleteComponent(curComponentId!);
    setCurComponentId(null);
  }

  // 处理删除后 高度问题
  useEffect(() => {
    updatePosition();
  }, [components]);

  // 获取父辈级component
  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = curComponent;

    while (component?.parentId) {
      component = getComponentById(component.parentId, components)!;
      parentComponents.push(component);
    }

    return parentComponents;
  }, [curComponent]);

  return createPortal(
    <>
      <div
        className="absolute border border-dashed border-blue pointer-events-none z-[12] rounded-[0.25rem] box-border"
        style={{
          left: position.left,
          top: position.top,
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          width: position.width,
          height: position.height,
        }}
      />
      <div
        className="absolute text-[0.875rem] z-[13] transform -translate-x-full -translate-y-full"
        style={{
          left: position.labelLeft,
          top: position.labelTop,
          display: !position.width || position.width < 10 ? 'none' : 'inline',
        }}
      >
        <Space>
          <Dropdown
            menu={{
              items: parentComponents.map((item) => ({
                key: item.id,
                label: item.name,
              })),
              onClick: ({ key }) => {
                setCurComponentId(+key);
              },
            }}
            disabled={parentComponents.length === 0}
          >
            <div
              className="rounded-[0.25rem] px-2 text-white cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'blue' }}
            >
              {curComponent?.name}
            </div>
          </Dropdown>
          {/* 不能删除page */}
          {curComponentId !== 1 && (
            <div className="px-2" style={{ backgroundColor: 'blue' }}>
              <Popconfirm
                title="确认删除？"
                okText={'确认'}
                cancelText={'取消'}
                onConfirm={handleDelete}
              >
                <DeleteOutlined className="text-white" />
              </Popconfirm>
            </div>
          )}
        </Space>
      </div>
    </>,
    el,
  );
}

export default SelectedMask;
