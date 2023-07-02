import { ChangeEvent, useRef } from 'react';
import { useTheme } from 'styled-components';
import { ToggleSwitch } from './styles';
import { ThemeSwitcherProps } from '../../interface/ThemeSwitcher';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuthState } from '../../app/selectors';
import { CreateTheme } from './api/theme';
import { lightTheme, darkTheme } from '../../theme';

function ThemeSwitcher({ setSelectedTheme }: ThemeSwitcherProps) {
  const swithcer = useRef(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuthState);
  const currentTheme = useTheme();

  const switchTheme = (e: ChangeEvent) => {
    const target = e?.target;
    let themeName = 'darkTheme';

    if ((target as HTMLInputElement).checked) {
      localStorage.setItem('theme', 'lightTheme');
      setSelectedTheme(lightTheme);
      themeName = 'lightTheme';
    } else {
      localStorage.setItem('theme', 'darkTheme');
      setSelectedTheme(darkTheme);
      themeName = 'darkTheme';
    }

    if (user) {
      dispatch(
        CreateTheme({
          userId: user.id,
          theme: themeName,
        }),
      );
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
