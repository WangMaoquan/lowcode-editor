import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { Header } from '../Header';
import { MaterialArea } from '../MaterialArea';
import { EditArea } from '../EditArea';
import { SettingArea } from '../SettingArea';

export function EditorLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <MaterialArea />
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <SettingArea />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
