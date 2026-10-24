import { SwitcherPosition } from '@/types/switcher.types';
import { useState } from 'react';
import SwitcherIcon from '../switcherIcon/SwitcherIcon';
import BaseSwitcher from '../baseSwitcher/BaseSwitcher';

export default function LangSwitcher() {
  const [position, setPosition] = useState<SwitcherPosition>('left');

  const onLeftClick = () => setPosition('left');
  const onRightClick = () => setPosition('right');

  const leftIcon = <SwitcherIcon iconType="english" onClick={onLeftClick} />;
  const rightIcon = <SwitcherIcon iconType="russian" onClick={onRightClick} />;

  return (
    <BaseSwitcher
      position={position}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  );
}
