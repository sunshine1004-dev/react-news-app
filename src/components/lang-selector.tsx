import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as locales from '@mui/material/locale';

type SupportedLocales = keyof typeof locales;

export default function Locales() {
  const [locale, setLocale] = React.useState<SupportedLocales>();


  return (
    <Autocomplete
      options={Object.keys(locales)}
      getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
      value={locale}
      fullWidth
      size='small'
      disableClearable
      onChange={(_event: any, newValue: string | null) => {
        setLocale(newValue as SupportedLocales);
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder='language' fullWidth />
      )}
    />
  );
}