import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import countryDemo from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

export default function CountrySelect() {
  countryDemo.registerLocale(enLocale);

  const countryObj = countryDemo.getNames("en", { select: "alias" });
  const countryNames = Object.keys(countryObj).map(key => ({
    label: countryObj[key],
    value: key.toLowerCase()
  }));

  const defined = new Set(['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']);

  const definedCountries = countryNames.filter(coun => defined.has(coun.value.toLowerCase()));

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={definedCountries}
      size='small'
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={e => console.log(e.target)} 
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.value}.png`}
            srcSet={`https://flagcdn.com/w40/${option.value}.png 2x`}
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='select country...'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}