import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props extends SelectProps {
  handleChange: (val: any) => void;
  option: {
    value: string | number,
    label: string
  }[]
}

const Dropdown = (props: Props) => {
  const { option, handleChange, ...otherProps } = props;

  return (
    <Select onChange={(e) => handleChange(e.target?.value)} {...otherProps}>
      {
        option.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))
      }
    </Select>
  )
}

export default Dropdown;