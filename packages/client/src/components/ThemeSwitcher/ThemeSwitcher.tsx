import { useRef } from 'react';
import { ToggleSwitch } from './styles';
import { darkTheme, lightTheme } from '../../theme';

function ThemeSwitcher({ setSelectedTheme }) {
  const swithcer = useRef(null);

  const switchTheme = (e) => {
    if (e.target.checked) {
      setSelectedTheme(lightTheme);
    } else {
      setSelectedTheme(darkTheme);
    }
  };

  return (
    <ToggleSwitch>
      <label htmlFor="theme">
        <input
          type="checkbox"
          id="theme"
          ref={swithcer}
          onChange={switchTheme}
        />
        <span className="slider" />
      </label>
    </ToggleSwitch>
  );
}

export default ThemeSwitcher;
