import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  getComponentById,
  useComponetsStore,
} from '../../stores/useComponetsStore';

interface HoverMaskProps {
  containerClassName: string;
  componentId: number;
  portalWrapperClassName: string;
}

function HoverMask({
  containerClassName,
  portalWrapperClassName,
  componentId,
}: HoverMaskProps) {
  const { components } = useComponetsStore();

  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

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
      labelLeft,
      labelTop,
    });
  }

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`)!;
  }, []);

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  return createPortal(
    <>
      <div
        className="absolute border border-dashed border-blue pointer-events-none z-[12] rounded-[0.25rem] box-border"
        style={{
          left: position.left,
          top: position.top,
          width: position.width,
          height: position.height,
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
        }}
      />
      <div
        className="absolute text-[0.875rem] z-[13] transform -translate-x-full -translate-y-full"
        style={{
          left: position.labelLeft,
          top: position.labelTop,
          display: !position.width || position.width < 10 ? 'none' : 'inline',
          backgroundColor: 'blue',
        }}
      >
        <div className="rounded-[0.25rem] text-white cursor-pointer whitespace-nowrap py-0 px-2">
          {curComponent?.name || 'template'}
        </div>
      </div>
    </>,
    el,
  );
}

export default HoverMask;
