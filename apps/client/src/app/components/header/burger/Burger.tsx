import Avatar from '@components/avatar/Avatar';
import BurgerMenu from './burgerMenu/BurgerMenu';
import { useState } from 'react';

export default function Burger() {
  const [showMenu, setShowMenu] = useState(false);

  const onAvatarClick = () => {
    if (showMenu) setShowMenu(false);
    else setShowMenu(true);
  };

  const onCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="relative" id="burger">
      <Avatar
        className="cursor-pointer hover:shadow-[0_0_20px_0_#272727] rounded-full duration-300"
        onClick={onAvatarClick}
        size={48}
      />
      {showMenu && <BurgerMenu onCloseMenu={onCloseMenu} />}
    </div>
  );
}
