import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props extends SelectProps {
  option: {
    value: string | number,
    label: string
  }[]
}

const Dropdown = (props: Props) => {
  const { option, ...otherProps } = props;
  return (
    <Select {...otherProps}>
      {
        option.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))
      }
    </Select>
  )
}

export default Dropdown;