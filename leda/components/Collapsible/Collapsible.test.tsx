// @ts-nocheck
import React from 'react';
import {
  render,

} from '@testing-library/react';
import { Collapsible } from './index';
import { Div } from '../Div/index';


const validText = 'some';

describe('Collapsible snapshot collection', () => {
  test('is Collapsible simple mode render right', () => {
    const { container } = render(<Collapsible>{validText}</Collapsible>);

    expect(container)
      .toMatchSnapshot();
  });
});

describe('Collapsible attributes test collection', () => {
  test('is Collpsible with children working right?', () => {
    const validChildrenClass = 'valid-class';
    const { container, getByText } = render(<Collapsible><Div className={validChildrenClass}>{validText}</Div></Collapsible>);

    expect(getByText(validText))
      .toBeInTheDocument();

    expect(container.querySelectorAll(`div.${validChildrenClass}`))
      .toHaveLength(1);
  });

  test('is Collapsible with isOpen and with transition=none working right ?', () => {
    const on = true;
    const off = false;
    const transitionOff = 'none';
    const { getByText, rerender } = render(<Collapsible transition={transitionOff} isOpen={off}>{validText}</Collapsible>);
    const collapsible = getByText(validText);

    expect(collapsible)
      .toHaveStyle('visibility: hidden');

    rerender(<Collapsible transition={transitionOff} isOpen={on}>{validText}</Collapsible>);

    expect(collapsible)
      .toHaveStyle('visibility: visible');
  });

  test('is Collapsible with default transition working right?', () => {
    const off = false;
    const { getByText } = render(<Collapsible isOpen={off}>{validText}</Collapsible>);
    const collapsible = getByText(validText);
    expect(collapsible)
      .toHaveStyle('transition: height 250ms cubic-bezier(.4, 0, .2, 1) 0ms');
  });

  test('is Collapsible with custom transition working right?', () => {
    const on = true;
    const { getByText } = render(<Collapsible transition="margin-right 4s ease-in-out 1s" isOpen={on}>{validText}</Collapsible>);
    const collapsible = getByText(validText);
    expect(collapsible)
      .toHaveStyle('transition: margin-right 4s ease-in-out 1s');
  });
});

describe('Collapsible events test collection', () => {
  test('is Collapsible onClose event handler work right?', () => {});
  test('is Collapsible onOpen event handler work right?', () => {});
  test('is Collapsible onToggle event handler work right?', () => {});
});
