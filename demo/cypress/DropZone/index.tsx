import * as React from 'react';
import * as L from '../../../leda';

export const DropZone = (): React.ReactElement => {
  const [value, setValue] = React.useState<L.DropZoneTypes.DropZoneFiles>({
    acceptedFiles: [{ name: 'external file', link: 'external file link' }],
    rejectedFiles: [],
  });

  return (
    <L.Div _demoStory>
      <L.Span>Uncontrolled, without validation</L.Span>
      <L.DropZone />

      <L.Span>Uncontrolled, with required validation</L.Span>
      <L.DropZone
        form="dropzone-form"
        name="dropzone"
        isRequired
        requiredMessage="Files are required!"
      />

      <L.Button form="dropzone-form" >Submit</L.Button>

      <br />

      <L.Span>Controlled</L.Span>
      <L.DropZone
        value={value}
        onChange={({ component: { value } }) => setValue(value)}
      />
    </L.Div>
  );
};
