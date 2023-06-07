import TextField, { BaseTextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface Props extends BaseTextFieldProps {
  handleChange: (val: string) => void;
  option: {
    value: string | number,
    label: string
  }[]
}

const Dropdown = (props: Props) => {
  const { option, handleChange, ...otherProps } = props;

  return (
    <TextField select onChange={(e) => handleChange(e.target.value)} {...otherProps}>
      {
        option.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))
      }
    </TextField>
  )
}

export default Dropdown;