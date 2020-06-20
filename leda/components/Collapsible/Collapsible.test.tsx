// @ts-nocheck
import React from 'react';
import {
  render,
  fireEvent,
  waitForDomChange,
} from '@testing-library/react';

import { renderHook, act } from '@testing-library/react-hooks';
import { useCollapsibleManagement } from './useCollapsibleManagement';

import { Collapsible } from './index';
import { Div } from '../Div/index';
import { Button } from '../Button/index';


const validName = 'name';
const validText = 'some';

describe('Collapsible snapshot collection', () => {
  test('is Collapsible simple mode render right', () => {
    const { container, debug } = render(<Collapsible>{validText}</Collapsible>);

    expect(container)
      .toMatchSnapshot();
  });
});

describe('Collapsible attributes test collection', () => {
  test('is Collpsible with children working right?', () => {
    const validChildrenClass = 'valid-class';
    const { container, getByText, debug } = render(<Collapsible><Div className={validChildrenClass}>{validText}</Div></Collapsible>);

    expect(getByText(validText))
      .toBeInTheDocument();

    expect(container.querySelectorAll(`div.${validChildrenClass}`))
      .toHaveLength(1);
  });

  test('is Collapsible with isOpen and with transition=none working right ?', () => {
    const on = true;
    const off = false;
    const transitionOff = 'none';
    const { container, getByText, rerender, debug } = render(<Collapsible transition={transitionOff} isOpen={off}>{validText}</Collapsible>);
    const collapsible = getByText(validText);

    expect(collapsible)
      .toHaveStyle('visibility: hidden');

    rerender(<Collapsible transition={transitionOff} isOpen={on}>{validText}</Collapsible>);

    expect(collapsible)
      .toHaveStyle('visibility: visible');
  });

  test('is Collapsible with default transition working right?', () => {
    const on = true;
    const off = false;
    const { container, getByText, rerender, debug } = render(<Collapsible isOpen={off}>{validText}</Collapsible>);
    const collapsible = getByText(validText);
    expect(collapsible)
      .toHaveStyle('transition: height 250ms cubic-bezier(.4, 0, .2, 1) 0ms');
  });

  test('is Collapsible with custom transition working right?', () => {
    const on = true;
    const off = false;
    const { container, getByText, rerender, debug } = render(<Collapsible transition= 'margin-right 4s ease-in-out 1s' isOpen={on}>{validText}</Collapsible>);
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
