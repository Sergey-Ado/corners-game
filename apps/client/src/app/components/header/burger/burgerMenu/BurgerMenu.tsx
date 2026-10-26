import clsx from 'clsx';
import { useEffect } from 'react';
import BurgerItem from './burgerItem/BurgerItem';
import { useDispatch } from 'react-redux';
import { changeShowSettings } from '@/app/store/generalSlice';

interface props {
  onCloseMenu: () => void;
}

export default function BurgerMenu({ onCloseMenu }: props) {
  useEffect(() => {
    const clickOver = (event: Event) => {
      const target = event.target;

      if (target instanceof Element && !target.closest('#burger'))
        onCloseMenu();
    };

    document.addEventListener('click', clickOver);

    return () => document.removeEventListener('click', clickOver);
  });

  const dispatch = useDispatch();

  const onClickSettings = () => {
    onCloseMenu();
    dispatch(changeShowSettings(true));
  };

  return (
    <div
      className={clsx(
        'absolute right-0 p-2 top-[calc(100%+8px)]',
        'flex flex-col',
        'bg-primary-light rounded-xl border dark:bg-primary-dark shadow-[0_0_20px_0_#272727]'
      )}>
      <BurgerItem
        iconType="settings"
        title="Settings"
        onClick={onClickSettings}
      />
    </div>
  );
}
