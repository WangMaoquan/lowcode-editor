import { useState } from 'react';
import { useComponetsStore } from '../../stores/useComponetsStore';
import { Segmented } from 'antd';
import { ComponentAttr } from './ComponentAttr';
import { ComponentStyle } from './ComponentStyle';
import { ComponentEvent } from './ComponentEvent';

export function SettingArea() {
  const { curComponentId } = useComponetsStore();

  const [key, setKey] = useState<string>('属性');

  if (!curComponentId) return null;

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={['属性', '样式', '事件']}
      />
      <div>
        {key === '属性' && <ComponentAttr />}
        {key === '样式' && <ComponentStyle />}
        {key === '事件' && <ComponentEvent />}
      </div>
    </div>
  );
}
