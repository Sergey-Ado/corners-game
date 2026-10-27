import { Pages } from '@/types/general.types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export default function WelcomePage() {
  const { t } = useTranslation();

  const welcome = t('welcome.welcome');
  const toGame = t('welcome.to-game');
  const corners = t('welcome.corners');
  const about = t('welcome.about');
  const login = t('welcome.login');
  const register = t('welcome.register');

  return (
    <main className="visual-panel p-2 grow flex items-center justify-center">
      <div
        className={clsx(
          'flex flex-col items-center gap-4',
          'max-w-160 px-4 xs:px-8'
        )}>
        <h2 className=" text-2xl xs:text-3xl">{welcome}</h2>
        <span>{toGame}</span>
        <h1
          className={clsx(
            'font-rub-spray text-4xl uppercase',
            'text-third-light text-shadow-[4px_4px_rgb(0,0,0)]',
            'xs:text-5xl'
          )}
          role="game-name">
          {corners}
        </h1>
        <p className="text-center my-4">{about}</p>
        <div className="flex gap-4">
          <Link to={`/${Pages.LOGIN}`}>
            <span className="button py-2 px-2 xs:px-4" role="login-link">
              {login}
            </span>
          </Link>
          <Link to={`/${Pages.REGISTER}`}>
            <span className="button py-2 px-2 xs:px-4" role="register-link">
              {register}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
