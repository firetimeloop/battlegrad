import { ChangeEvent, SetStateAction, useRef } from 'react';
import { ToggleSwitch } from './styles';
import { darkTheme, lightTheme } from '../../theme';

function ThemeSwitcher({ setSelectedTheme }: { setSelectedTheme: SetStateAction<any>}) {
  const swithcer = useRef(null);

  const switchTheme = (e: ChangeEvent) => {
    const target = e?.target;
    if ((target as HTMLInputElement).checked) {
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
