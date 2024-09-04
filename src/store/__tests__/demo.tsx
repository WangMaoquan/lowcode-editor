import { useEffect } from 'react';
import { Component, useComponetsStore } from '..';
import { idAdd } from './utils';

export function TestDemo({ states }: { states: Component[] }) {
  const { components, addComponent, deleteComponent, updateComponentProps } =
    useComponetsStore();

  // no parentid
  const add = () => {
    const id = idAdd();
    addComponent({
      id,
      name: 'test' + id,
      props: {},
    });
  };

  // has parentId
  const add2 = () => {
    const id = idAdd();
    addComponent(
      {
        id,
        name: 'test' + id,
        props: {},
      },
      1,
    );
  };

  const del = (id: number) => {
    deleteComponent(id);
  };

  const update = (id: number) => {
    const props = {
      className: 'cls' + id,
    };
    updateComponentProps(id, props);
  };

  const renderData = (data: Component[]) => {
    return data.map((c) => (
      <div key={c.id}>
        <button onClick={() => del(c.id)}>{`del-${c.name}`}</button>
        <button onClick={() => update(c.id)}>{`update-${c.name}`}</button>
        {c.children && c.children.length !== 0 && renderData(c.children)}
      </div>
    ));
  };

  useEffect(() => {
    states.length = 0;
    states.push(...components);
  }, [components]);

  return (
    <div>
      <p>test-demo</p>
      <button onClick={add}>add-no-parentid</button>
      <button onClick={add2}>add-has-parentid</button>
      {renderData(components)}
    </div>
  );
}
