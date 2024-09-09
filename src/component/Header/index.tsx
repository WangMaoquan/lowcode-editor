import { Button, Space } from 'antd';
import { useComponetsStore } from '../../stores/useComponetsStore';

export function Header() {
  const { mode, setMode, setCurComponentId } = useComponetsStore();

  const handleEdit = () => {
    setMode('edit');
  };

  const handlePreview = () => {
    setMode('preview');
    setCurComponentId(null);
  };

  return (
    <div className="min-h-[3.75rem] sticky flex items-center justify-between border-b border-black px-4">
      <div>低代码编辑器</div>
      <Space>
        <Button
          type="primary"
          onClick={() => (mode === 'edit' ? handlePreview() : handleEdit())}
        >
          {mode === 'edit' ? '预览' : '退出预览'}
        </Button>
      </Space>
    </div>
  );
}
