import { Pages } from '@/types/general.types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export default function LoginPage() {
  const { t } = useTranslation();

  const title = t('login.title');
  const email = t('login.email');
  const password = t('login.password');
  const submit = t('login.button');
  const registerLink = t('login.register.link');
  const registerDesc = t('login.register.desc');

  return (
    <main className="visual-panel p-2 grow flex items-center justify-center">
      <form className="flex flex-col gap-4">
        <h2 className="capitalize self-center font-bold text-xl">{title}</h2>
        <div className="flex flex-col">
          <label htmlFor="login-email" className="capitalize mb-1">
            {email}
          </label>
          <input type="text" id="login-email" className="input" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="login-password" className="capitalize mb-1">
            {password}
          </label>
          <input type="password" id="login-password" className="input" />
        </div>
        <button type="submit" className="button self-center py-2 px-4">
          {submit}
        </button>
        <div>
          <Link to={`/${Pages.REGISTER}`}>
            <span className="hover:text-third-light dark:hover:text-hover-dark duration-300 underline">
              {registerLink}
            </span>
          </Link>
          <span>{registerDesc}</span>
        </div>
      </form>
    </main>
  );
}
