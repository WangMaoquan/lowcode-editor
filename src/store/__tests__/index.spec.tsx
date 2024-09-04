import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { TestDemo } from './demo';
import { Component, resetStore } from '..';
import { resetId } from './utils';
const components: Component[] = [];
const renderDemo = () => {
  return render(<TestDemo states={components} />);
};

const doClick = async (user: UserEvent, name: string) => {
  await act(async () => {
    await user.click(await screen.findByRole('button', { name }));
  });
};

beforeEach(() => {
  components.length = 0;
  resetStore();
  resetId();
});

describe('useComponentsStore', () => {
  it('components', async () => {
    renderDemo();
    await screen.debug();
    expect(components).toEqual([
      { id: 1, name: 'Page', props: {}, desc: '页面' },
    ]);
  });

  it('addComponent no parentid param', async () => {
    const user = userEvent.setup();
    renderDemo();
    await doClick(user, 'add-no-parentid');

    expect(components.length).toBe(2);

    expect(components).toEqual([
      { id: 1, name: 'Page', props: {}, desc: '页面' },
      {
        id: 2,
        name: 'test2',
        props: {},
      },
    ]);
  });

  it('addComponent has parentid param', async () => {
    const user = userEvent.setup();
    renderDemo();
    await doClick(user, 'add-has-parentid');
    expect(components.length).toBe(1);

    const children = components[0].children || [];
    expect(children.length).toBe(1);

    expect(children).toEqual([
      { id: 2, name: 'test2', props: {}, parentId: 1 },
    ]);
  });

  it('deleteComponent', async () => {
    const user = userEvent.setup();
    renderDemo();
    // name test2 id 2
    await doClick(user, 'add-no-parentid');
    // name test3
    await doClick(user, 'add-no-parentid');
    // name test4
    await doClick(user, 'add-has-parentid');

    expect(components.length).toBe(3);

    await doClick(user, 'del-test3');
    expect(components.length).toBe(2);
    expect(components[0].children?.length).toBe(1);

    await doClick(user, 'del-test4');
    expect(components.length).toBe(2);
    expect(components[0].children?.length).toBe(0);

    await doClick(user, 'del-test2');
    expect(components.length).toBe(1);
  });
});
