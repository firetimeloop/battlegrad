import { ToggleSwitch } from './styles';

function ThemeSwitcher() {
  return (
    <ToggleSwitch>
      <label>
        <input type="checkbox" />
        <span className="slider" />
      </label>
    </ToggleSwitch>
  );
}

export default ThemeSwitcher;
