import { useEffect } from 'react';
import { Component, useComponetsStore } from '..';

let id = 1;

export function TestDemo({ states }: { states: Component[] }) {
  const { components, addComponent, deleteComponent } = useComponetsStore();

  // no parentid
  const add = () => {
    addComponent({
      id: ++id,
      name: 'test' + id,
      props: {},
    });
  };

  // has parentId
  const add2 = () => {
    addComponent(
      {
        id: ++id,
        name: 'test' + id,
        props: {},
      },
      1,
    );
  };

  const del = (id: number) => {
    deleteComponent(id);
  };

  const renderData = (data: Component[]) => {
    return data.map((c) => (
      <div key={c.id}>
        <button onClick={() => del(c.id)}>{c.name}</button>
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
