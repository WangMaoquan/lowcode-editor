import { Component, useComponetsStore } from '..';

export function TestDemo({ states }: { states: Component[] }) {
  const { components } = useComponetsStore();
  states.push(...components);

  return <div>{JSON.stringify(components, null, 2)}</div>;
}
