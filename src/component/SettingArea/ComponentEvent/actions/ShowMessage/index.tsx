import { Input, Select } from 'antd';
import { ComponentEvent } from '../../../../../stores/useComponentsConfigStore';
import { useComponetsStore } from '../../../../../stores/useComponetsStore';

export function ShowMessage(props: { event: ComponentEvent }) {
  const { event } = props;

  const { curComponentId, curComponent, updateComponentProps } =
    useComponetsStore();

  function messageTypeChange(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          type: value,
        },
      },
    });
  }

  function messageTextChange(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          text: value,
        },
      },
    });
  }

  return (
    <div className="mt-[0.625rem]">
      <div className="flex items-center">
        <div className="text-nowrap">类型：</div>
        <div>
          <Select
            className="w-[10rem]"
            options={[
              { label: '成功', value: 'success' },
              { label: '失败', value: 'error' },
            ]}
            onChange={(value) => {
              messageTypeChange(event.name, value);
            }}
            value={curComponent?.props?.[event.name]?.config?.type}
          />
        </div>
      </div>
      <div className="flex items-center mt-[0.625rem]">
        <div className="text-nowrap"> 文本：</div>
        <div>
          <Input
            onChange={(e) => {
              messageTextChange(event.name, e.target.value);
            }}
            value={curComponent?.props?.[event.name]?.config?.text}
          />
        </div>
      </div>
    </div>
  );
}
