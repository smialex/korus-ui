import { isFunction } from 'lodash';
import { formatDateTime } from '../helpers';
import { setFocused } from '../actions';
import {
  HandlersData,
} from '../types';
import { FocusEvent } from '../../MaskedInputBase/types';


export const createFocusHandler = ({ props, state, dispatch }: HandlersData) => (ev: FocusEvent): void => {
  const {
    name,
    onFocus,
    outputFormat,
  } = props;
  const { date } = state;

  dispatch(setFocused(true));

  if (isFunction(onFocus)) {
    onFocus({
      ...ev,
      component: {
        date,
        name,
        value: outputFormat ? formatDateTime(date, outputFormat) : ev.component.value,
      },
    });
  }
};
