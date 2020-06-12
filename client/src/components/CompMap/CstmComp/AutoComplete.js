import {
  FormControl,
  Paper,
  MenuItem,
  MenuList,
  TextField,
} from "@material-ui/core";

export default function AutoComplete() {
  const menuValues = [
    { id: "value1", label: "Value 1" },
    { id: "value2", label: "Value 2" },
    { id: "value3", label: "Value 3" },
    { id: "value4", label: "Value 4" },
  ];

  const [state, setState] = useState({
    selectedValue: "",
    menuOpen: false,
  });

  function onTextAreaChange(e) {
    setState({ ...state, menuOpen: true });
  }

  function onBlur(e) {
    setState({ ...state, menuOpen: false });
  }

  return (
    <React.Fragment>
      <FormControl onBlur={onBlur}>
        <TextField onFocus={onTextAreaChange} />
        {state.menuOpen && (
          <Paper>
            <MenuList>
              {menuValues.map((value) => (
                <MenuItem key={value.id} value={value.id}>
                  {value.label}
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        )}
      </FormControl>
    </React.Fragment>
  );
}
