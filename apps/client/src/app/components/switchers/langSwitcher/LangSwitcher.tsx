import { SwitcherPosition } from '@/types/switcher.types';
import { useState } from 'react';
import SwitcherIcon from '../switcherIcon/SwitcherIcon';
import BaseSwitcher from '../baseSwitcher/BaseSwitcher';
import i18next from 'i18next';
import Storage from '@/utils/storage';

const storage = new Storage();

export default function LangSwitcher() {
  const [position, setPosition] = useState<SwitcherPosition>(
    i18next.language === 'en' ? 'left' : 'right'
  );

  const onLeftClick = () => {
    i18next.changeLanguage('en');
    storage.setLanguage('en');
    setPosition('left');
  };
  const onRightClick = () => {
    i18next.changeLanguage('ru');
    storage.setLanguage('ru');
    setPosition('right');
  };

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
