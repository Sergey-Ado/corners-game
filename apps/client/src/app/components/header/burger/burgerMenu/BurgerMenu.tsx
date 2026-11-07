import clsx from 'clsx';
import { useEffect } from 'react';
import BurgerItem from './burgerItem/BurgerItem';
import { useDispatch, useSelector } from 'react-redux';
import { changeShowSettings, changeUserdata } from '@/app/store/generalSlice';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/app/store/store';
import { useNavigate } from 'react-router';
import { Pages } from '@/types/general.types';
import Storage from '@/utils/storage';

interface props {
  onCloseMenu: () => void;
}

const storage = new Storage();

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
  const navigate = useNavigate();

  const { id } = useSelector((state: RootState) => state.general.userdata);

  const onClickSettings = () => {
    onCloseMenu();
    dispatch(changeShowSettings(true));
  };

  const onClickLogout = () => {
    onCloseMenu();
    storage.removeToken();
    dispatch(changeUserdata({ id: '', username: '' }));
    navigate(`/${Pages.LOGIN}`);
  };

  const { t } = useTranslation();
  const settings = t('header.settings');
  const logout = t('header.logout');

  return (
    <div
      className={clsx(
        'absolute right-0 p-2 top-[calc(100%+8px)]',
        'flex flex-col',
        'bg-primary-light rounded-xl border dark:bg-primary-dark shadow-[0_0_20px_0_#272727]'
      )}
      role="burger-menu">
      <BurgerItem
        iconType="settings"
        title={settings}
        onClick={onClickSettings}
      />
      {id && (
        <BurgerItem iconType="logout" title={logout} onClick={onClickLogout} />
      )}
    </div>
  );
}
