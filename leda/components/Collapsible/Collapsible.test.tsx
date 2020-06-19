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
  test('is Collpsible with children work right?', () => {
    const validChildrenClass = 'valid-class';
    const { container, getByText, debug } = render(<Collapsible><Div className={validChildrenClass}>{validText}</Div></Collapsible>);

    expect(getByText(validText))
      .toBeInTheDocument();

    expect(container.querySelectorAll(`div.${validChildrenClass}`))
      .toHaveLength(1);
  });
});
describe('Collapsible events test collection', () => {
  test('is Collapsible onOpen event handler work right?', async () => {
    const { result } = renderHook(() => useCollapsibleManagement());
    act(() => {
      result.current.openCollapsible();
    });
    expect(result.current.isOpen).toBe(true);
  });
});
