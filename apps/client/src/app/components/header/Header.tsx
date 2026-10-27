import { Pages } from '@/types/general.types';
import clsx from 'clsx';
import { Link } from 'react-router';
import Burger from './burger/Burger';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  const logo = t('header.logo');

  return (
    <header>
      <div
        className={clsx(
          'visual-panel p-2',
          'flex flex-row items-center justify-between'
        )}>
        <Link to={`/${Pages.WELCOME}`}>
          <span
            className={clsx(
              'font-rub-spray text-2xl uppercase',
              'text-third-light text-shadow-[2px_2px_rgb(0,0,0)]',
              'xs:text-3xl'
            )}
            role="logo">
            {logo}
          </span>
        </Link>
        <Burger />
      </div>
    </header>
  );
}
