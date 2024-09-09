import { Input } from 'antd';
import { useComponetsStore } from '../../../../../stores/useComponetsStore';
import { useState } from 'react';

export interface GoToLinkConfig {
  type: 'goToLink';
  url: string;
}

export interface GoToLinkProps {
  defaultValue?: string;
  onChange?: (config: GoToLinkConfig) => void;
}

export function GoToLink(props: GoToLinkProps) {
  const { defaultValue, onChange } = props;

  const { curComponentId } = useComponetsStore();
  const [value, setValue] = useState(defaultValue);

  function urlChange(value: string) {
    if (!curComponentId) return;

    setValue(value);

    onChange?.({
      type: 'goToLink',
      url: value,
    });
  }

  return (
    <div className="mt-[0.625rem]">
      <div className="flex items-center gap-[0.625rem]">
        <div className="text-nowrap">链接:</div>
        <div>
          <Input.TextArea
            style={{ height: '12.5rem' }}
            className="w-[31.25rem] border border-black"
            onChange={(e) => {
              urlChange(e.target.value);
            }}
            value={value || ''}
          />
        </div>
      </div>
    </div>
  );
}
