import { useState } from 'react';
import BaseSwitcher from '../baseSwitcher/BaseSwitcher';
import SwitcherIcon from '../switcherIcon/SwitcherIcon';
import { SwitcherPosition } from '@/types/switcher.types';

export default function ThemeSwitcher() {
  const [position, setPosition] = useState<SwitcherPosition>('left');

  const onLeftClick = () => setPosition('left');
  const onRightClick = () => setPosition('right');

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
