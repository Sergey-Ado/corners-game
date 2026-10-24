import { Pages } from '@/types/general.types';
import clsx from 'clsx';
import { Link } from 'react-router';

export default function Header() {
  return (
    <header>
      <div className="visual-panel p-2">
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
      </div>
    </header>
  );
}
