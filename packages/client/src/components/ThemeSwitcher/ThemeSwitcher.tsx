import { ToggleSwitch } from './styles';

function ThemeSwitcher() {
  return (
    <ToggleSwitch>
      <label htmlFor="theme">
        <input type="checkbox" id="theme" />
        <span className="slider" />
      </label>
    </ToggleSwitch>
  );
}

export default ThemeSwitcher;
