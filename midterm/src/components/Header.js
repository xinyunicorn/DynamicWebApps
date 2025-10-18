import Dropdown from "./Dropdown";

// header component with title and color selector
function Header(props) {
  const {colorOptions, background, onColorChange} = props;

  return (
    <header className="app-header">
      <h1>Weekly To-Do Tracker</h1>
      <Dropdown options={colorOptions} value={background} onChange={onColorChange} />
    </header>
  );
}

export default Header;
