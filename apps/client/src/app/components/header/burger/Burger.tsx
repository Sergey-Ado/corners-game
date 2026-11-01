import Avatar from '@components/avatar/Avatar';
import BurgerMenu from './burgerMenu/BurgerMenu';
import { useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import EmptyAvatar from './emptyAvatar/EmptyAvatar';

export default function Burger() {
  const [showMenu, setShowMenu] = useState(false);

  const onAvatarClick = () => {
    if (showMenu) setShowMenu(false);
    else setShowMenu(true);
  };

  const onCloseMenu = () => {
    setShowMenu(false);
  };

  const { id, username } = useSelector(
    (state: RootState) => state.general.userdata
  );

  const icon = id ? (
    <Avatar size={42} seed={id} title={username} />
  ) : (
    <EmptyAvatar />
  );

  return (
    <div className="relative" id="burger" role="burger">
      <div
        className={clsx(
          'cursor-pointer rounded-full duration-300',
          'hover:shadow-[0_0_20px_0_#272727] dark:hover:shadow-[0_0_20px_0_#fff]'
        )}
        onClick={onAvatarClick}>
        {icon}
      </div>
      {showMenu && <BurgerMenu onCloseMenu={onCloseMenu} />}
    </div>
  );
}
