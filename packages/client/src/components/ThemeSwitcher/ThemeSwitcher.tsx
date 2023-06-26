import { ChangeEvent, useRef } from 'react';
import { useTheme } from 'styled-components';
import { ToggleSwitch } from './styles';
import { darkTheme, lightTheme } from '../../theme';
import { ThemeSwitcherProps } from '../../interface/ThemeSwitcher';

function ThemeSwitcher({ setSelectedTheme }: ThemeSwitcherProps) {
  const swithcer = useRef(null);
  const currentTheme = useTheme();

  const switchTheme = (e: ChangeEvent) => {
    const target = e?.target;

    if ((target as HTMLInputElement).checked) {
      localStorage.setItem('theme', JSON.stringify(lightTheme));
      setSelectedTheme(lightTheme);
    } else {
      localStorage.setItem('theme', JSON.stringify(darkTheme));
      setSelectedTheme(darkTheme);
    }
  };

  return (
    <ToggleSwitch>
      <label htmlFor="theme">
        <input
          checked={currentTheme!.name !== 'darkTheme'}
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
