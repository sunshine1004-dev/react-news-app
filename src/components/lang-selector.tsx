import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as locales from '@mui/material/locale';

interface Props {
  value: string | null;
  handleChange: (lang: string | null) => void;
}

export default function Locales(props: Props) {

  const options: string[] = Object.keys(locales)

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
      value={props.value as string | undefined}
      fullWidth
      size='small'
      disableClearable
      onChange={(_event: any, newValue: string | null) => {
        props.handleChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='language'
          fullWidth
        />
      )}
    />
  );
}