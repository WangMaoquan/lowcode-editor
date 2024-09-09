import { Input } from 'antd';
import { useComponetsStore } from '../../../../../stores/useComponetsStore';
import { ComponentEvent } from '../../../../../stores/useComponentsConfigStore';

export function GoToLink(props: { event: ComponentEvent }) {
  const { event } = props;

  const { curComponentId, curComponent, updateComponentProps } =
    useComponetsStore();

  function urlChange(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        url: value,
      },
    });
  }

  return (
    <div className="mt-[0.625rem]">
      <div className="flex items-center gap-[0.625rem]">
        <div className="text-nowrap">链接:</div>
        <div>
          <Input
            onChange={(e) => {
              urlChange(event.name, e.target.value);
            }}
            value={curComponent?.props?.[event.name]?.url}
          />
        </div>
      </div>
    </div>
  );
}
