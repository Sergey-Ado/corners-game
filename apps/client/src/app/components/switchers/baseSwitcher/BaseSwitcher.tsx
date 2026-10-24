import { SwitcherPosition } from '@/types/switcher.types';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface props {
  position: SwitcherPosition;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
}

export default function BaseSwitcher({ position, leftIcon, rightIcon }: props) {
  const shift = position === 'left' ? 'left-1' : 'left-10';

  return (
    <div
      className={clsx(
        'bg-secondary-light dark:bg-secondary-dark w-20 h-11 rounded-full flex items-center text-xl dark:text-white relative border'
      )}>
      {leftIcon}
      {rightIcon}
      <div
        className={clsx(
          'bg-primary-light dark:bg-primary-dark w-8 h-8 rounded-full absolute cursor-auto duration-200 border',
          shift
        )}
        role="switcher-circle"></div>
    </div>
  );
}
