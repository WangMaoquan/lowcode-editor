import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { Header } from '../Header';
import { EditArea } from '../EditArea';
import { SettingArea } from '../SettingArea';
import { MaterialWrapper } from '../MaterialArea/MaterialWrapper';
import { useComponetsStore } from '../../stores/useComponetsStore';
import { Preview } from '../Preview';

export function EditorLayout() {
  const { mode } = useComponetsStore();
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {mode === 'edit' ? (
        <Allotment>
          <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
            <MaterialWrapper />
          </Allotment.Pane>
          <Allotment.Pane>
            <EditArea />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <SettingArea />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <Preview />
      )}
    </div>
  );
}
