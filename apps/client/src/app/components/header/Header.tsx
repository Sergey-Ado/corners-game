import { Pages } from '@/types/general.types';
import clsx from 'clsx';
import { Link } from 'react-router';
import Burger from './burger/Burger';

export default function Header() {
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
            corners
          </span>
        </Link>
        <Burger />
      </div>
    </header>
  );
}
