import * as React from 'react';
import { SomeObject } from '../../../leda/commonTypes';
import * as L from '../../../leda';

export const OutputFormat = (args: SomeObject): React.ReactElement => {
  const nowDate = new Date(Date.now())
  const [date, setDate] = React.useState(nowDate);
  const [value, setValue] = React.useState('');

  return (
    <L.Div _box _inner _demoBg>
      <L.H4 _formattedValue>value: {value}</L.H4>
      <L.DatePicker
        data-test="datepicker"
        format="dd.MM.yyyy"
        onChange={ev => {
          console.info('outputFormat onChange', ev);
          setDate(ev.component.date); // date object
          setValue(ev.component.value); // formatted
        }}
        outputFormat="dd/MM/yyyy"
        value={date}
      />
    </L.Div>
  );
}
