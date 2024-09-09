import { Input, Select } from 'antd';
import { useComponetsStore } from '../../../../../stores/useComponetsStore';
import { useState } from 'react';

export interface ShowMessageConfig {
  type: 'showMessage';
  config: {
    type: 'success' | 'error';
    text: string;
  };
}

export interface ShowMessageProps {
  value?: ShowMessageConfig['config'];
  onChange?: (config: ShowMessageConfig) => void;
}

export function ShowMessage(props: ShowMessageProps) {
  const { value, onChange } = props;

  const { curComponentId } = useComponetsStore();

  const [type, setType] = useState<'success' | 'error'>(
    value?.type || 'success',
  );
  const [text, setText] = useState<string>(value?.text || '');

  function messageTypeChange(value: 'error' | 'success') {
    if (!curComponentId) return;

    if (!curComponentId) return;

    setType(value);

    onChange?.({
      type: 'showMessage',
      config: {
        type: value,
        text,
      },
    });
  }

  function messageTextChange(value: string) {
    if (!curComponentId) return;

    setText(value);

    onChange?.({
      type: 'showMessage',
      config: {
        type,
        text: value,
      },
    });
  }

  return (
    <div className="mt-[0.625rem]">
      <div className="flex items-center">
        <div className="text-nowrap">类型：</div>
        <div>
          <Select
            className="w-[31.25rem]"
            options={[
              { label: '成功', value: 'success' },
              { label: '失败', value: 'error' },
            ]}
            onChange={(value) => {
              messageTypeChange(value);
            }}
            value={type || 'success'}
          />
        </div>
      </div>
      <div className="flex items-center mt-[0.625rem]">
        <div className="text-nowrap"> 文本：</div>
        <div>
          <Input
            className="w-[31.25rem]"
            onChange={(e) => {
              messageTextChange(e.target.value);
            }}
            value={text || ''}
          />
        </div>
      </div>
    </div>
  );
}
