import { Collapse, CollapseProps, Button } from 'antd';
import { useComponetsStore } from '../../../stores/useComponetsStore';
import {
  useComponentConfigStore,
  ComponentEvent as CompEvent,
} from '../../../stores/useComponentsConfigStore';
import { useState } from 'react';
import { ActionModal } from './ActionModal';
import { GoToLinkConfig } from './actions/GoToLink';
import { ShowMessageConfig } from './actions/ShowMessage';
import { DeleteOutlined } from '@ant-design/icons';

export function ComponentEvent() {
  const { curComponent, updateComponentProps } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [curEvent, setCurEvent] = useState<CompEvent>();

  if (!curComponent) return null;

  const DelBtn = ({ event, index }: { event: CompEvent; index: number }) => {
    return (
      <div
        className="absolute top-[0.625rem] right-[0.625rem] cursor-pointer"
        onClick={() => deleteAction(event, index)}
      >
        <DeleteOutlined />
      </div>
    );
  };

  const items: CollapseProps['items'] = (
    componentConfig[curComponent.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      showArrow: false,
      label: (
        <div className="flex justify-between leading-[1.875rem]">
          {event.label}
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setCurEvent(event);
              setActionModalOpen(true);
            }}
          >
            添加动作
          </Button>
        </div>
      ),
      children: (
        <div>
          {(curComponent.props[event.name]?.actions || []).map(
            (item: GoToLinkConfig | ShowMessageConfig, index: number) => {
              return (
                <div>
                  {item.type === 'goToLink' ? (
                    <div className="border border-[#aaa] m-[0.625rem] p-[0.625rem] relative">
                      <div className="text-[blue]">跳转链接</div>
                      <div>{item.url}</div>
                      <DelBtn event={event} index={index} />
                    </div>
                  ) : null}
                  {item.type === 'showMessage' ? (
                    <div className="border border-[#aaa] m-[0.625rem] p-[0.625rem] relative">
                      <div className="text-[blue]">消息弹窗</div>
                      <div>{item.config.type}</div>
                      <div>{item.config.text}</div>
                      <DelBtn event={event} index={index} />
                    </div>
                  ) : null}
                </div>
              );
            },
          )}
        </div>
      ),
    };
  });

  function handleModalOk(config?: GoToLinkConfig | ShowMessageConfig) {
    if (!config || !curEvent || !curComponent) {
      return;
    }

    updateComponentProps(curComponent.id, {
      [curEvent.name]: {
        actions: [
          ...(curComponent.props[curEvent.name]?.actions || []),
          config,
        ],
      },
    });

    setActionModalOpen(false);
  }

  function deleteAction(event: CompEvent, index: number) {
    if (!curComponent) {
      return;
    }

    const actions = curComponent.props[event.name]?.actions;

    actions.splice(index, 1);

    updateComponentProps(curComponent.id, {
      [event.name]: {
        actions: actions,
      },
    });
  }

  return (
    <div className="px-[0.625rem]">
      <Collapse
        className="mb-[0.625rem]"
        items={items}
        defaultActiveKey={componentConfig[curComponent.name].events?.map(
          (item) => item.name,
        )}
      />
      <ActionModal
        visible={actionModalOpen}
        handleOk={handleModalOk}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
}
