import { useState } from 'react';
import BaseSwitcher from '../baseSwitcher/BaseSwitcher';
import SwitcherIcon from '../switcherIcon/SwitcherIcon';
import { SwitcherPosition } from '@/types/switcher.types';
import Storage from '@/utils/storage';

const storage = new Storage();

export default function ThemeSwitcher() {
  const theme = storage.getTheme();

  const [position, setPosition] = useState<SwitcherPosition>(
    theme === 'light' ? 'left' : 'right'
  );

  const onLeftClick = () => {
    setPosition('left');
    document.documentElement.classList.remove('dark');
    storage.setTheme('light');
  };
  const onRightClick = () => {
    setPosition('right');
    document.documentElement.classList.add('dark');
    storage.setTheme('dark');
  };

  const leftIcon = (
    <SwitcherIcon iconType="light-theme" onClick={onLeftClick} />
  );
  const rightIcon = (
    <SwitcherIcon iconType="dark-theme" onClick={onRightClick} />
  );

  return (
    <BaseSwitcher
      position={position}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  );
}
