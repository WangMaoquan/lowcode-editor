import { Collapse, Select, CollapseProps } from 'antd';
import { useComponetsStore } from '../../../stores/useComponetsStore';
import { useComponentConfigStore } from '../../../stores/useComponentsConfigStore';
import { GoToLink } from './actions/GoToLink';
import { ShowMessage } from './actions/ShowMessage';

export function ComponentEvent() {
  const { curComponentId, curComponent, updateComponentProps } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  if (!curComponent) return null;

  function selectAction(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, { [eventName]: { type: value } });
  }

  const items: CollapseProps['items'] = (
    componentConfig[curComponent.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      label: event.label,
      children: (
        <div>
          <div className="flex items-center">
            <div>动作：</div>
            <Select
              className="w-[10rem]"
              options={[
                { label: '显示提示', value: 'showMessage' },
                { label: '跳转链接', value: 'goToLink' },
              ]}
              value={curComponent?.props?.[event.name]?.type}
              onChange={(value) => {
                selectAction(event.name, value);
              }}
            />
          </div>
          {curComponent?.props?.[event.name]?.type === 'goToLink' && (
            <GoToLink event={event} />
          )}
          {curComponent?.props?.[event.name]?.type === 'showMessage' && (
            <ShowMessage event={event} />
          )}
        </div>
      ),
    };
  });

  return (
    <div className="px-[0.625rem]">
      <Collapse className="mb-[0.625rem]" items={items} />
    </div>
  );
}
