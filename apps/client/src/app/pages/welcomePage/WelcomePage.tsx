import { Pages } from '@/types/general.types';
import clsx from 'clsx';
import { Link } from 'react-router';

export default function WelcomePage() {
  return (
    <main className="visual-panel p-2 grow flex items-center justify-center">
      <div
        className={clsx('flex flex-col items-center gap-4', 'max-w-160 px-8')}>
        <h2 className=" text-2xl capitalize xs:text-3xl">welcome</h2>
        <span>to game</span>
        <h1
          className={clsx(
            'font-rub-spray text-4xl uppercase',
            'text-third-light text-shadow-[4px_4px_rgb(0,0,0)]',
            'xs:text-5xl'
          )}
          role="game-name">
          corners
        </h1>
        <p className="text-center my-4">
          A classic logic game on a chessboard. Your goal is to be the first to
          move all your pieces from your corner to the opposite one — one step
          at a time or by jumping over other pieces. Simple rules, deep
          decisions. Shall we play?
        </p>
        <div className="flex gap-4">
          <Link to={`/${Pages.LOGIN}`}>
            <span className="button py-2 px-4" role="login-link">
              login
            </span>
          </Link>
          <Link to={`/${Pages.REGISTER}`}>
            <span className="button py-2 px-4" role="register-link">
              register
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
