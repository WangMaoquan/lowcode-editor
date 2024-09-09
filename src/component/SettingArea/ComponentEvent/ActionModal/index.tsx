import { Modal, Segmented } from 'antd';
import { useState } from 'react';
import { GoToLink, GoToLinkConfig } from '../actions/GoToLink';
import { ShowMessage, ShowMessageConfig } from '../actions/ShowMessage';

interface ActionModalProps {
  visible: boolean;
  handleOk: (config?: GoToLinkConfig | ShowMessageConfig) => void;
  handleCancel: () => void;
}

export function ActionModal(props: ActionModalProps) {
  const { visible, handleOk, handleCancel } = props;

  const [key, setKey] = useState<string>('访问链接');
  const [curConfig, setCurConfig] = useState<
    GoToLinkConfig | ShowMessageConfig
  >();

  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      okText="添加"
      cancelText="取消"
      onOk={() => handleOk(curConfig)}
      onCancel={handleCancel}
    >
      <div className="h-[31.25rem">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={['访问链接', '消息提示', '自定义 JS']}
        />
        {key === '访问链接' && (
          <GoToLink
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === '消息提示' && (
          <ShowMessage
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
