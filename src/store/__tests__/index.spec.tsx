import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { TestDemo } from './demo';
import { Component } from '..';
const states: Component[] = [];
const renderDemo = () => {
  return render(<TestDemo states={states} />);
};

beforeEach(() => {
  states.length = 0;
});

describe('useComponentsStore', () => {
  it('test', () => {
    renderDemo();
    screen.debug();
    console.log(states);
    expect(states).toEqual([{ id: 1, name: 'Page', props: {}, desc: '页面' }]);
  });
});
