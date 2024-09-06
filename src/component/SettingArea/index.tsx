import { useComponetsStore } from '../../stores/useComponetsStore';

export function SettingArea() {
  const { components } = useComponetsStore();

  return (
    <div>
      <pre>{JSON.stringify(components, null, 2)}</pre>
    </div>
  );
}
