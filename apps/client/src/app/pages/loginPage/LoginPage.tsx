import { Pages } from '@/types/general.types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput } from '@repo/shared/user';
import { LoginInputSchema } from '@repo/shared/user-schema';

export default function LoginPage() {
  const { t } = useTranslation();

  const title = t('login.title');
  const email = t('login.email');
  const password = t('login.password');
  const submit = t('login.button');
  const registerLink = t('login.register.link');
  const registerDesc = t('login.register.desc');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(LoginInputSchema) });

  const onSubmit = (data: LoginInput) => {
    console.log(data);
  };

  return (
    <main className="visual-panel p-2 grow flex items-center justify-center">
      <form
        className="flex flex-col gap-4 w-full max-w-2xs"
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className="capitalize self-center font-bold text-xl">{title}</h2>
        <div className="flex flex-col">
          <label htmlFor="login-email" className="capitalize mb-1">
            {email}
          </label>
          <input
            type="text"
            id="login-email"
            className="input"
            role="input-email"
            {...register('email')}
          />
          {errors.email?.message && (
            <p role="error-email">{t(errors.email.message)}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="login-password" className="capitalize mb-1">
            {password}
          </label>
          <input
            type="text"
            id="login-password"
            className="input"
            role="input-password"
            {...register('password')}
          />
          {errors.password?.message && (
            <p role="error-password">{t(errors.password.message)}</p>
          )}
        </div>
        <button
          type="submit"
          className="button self-center py-2 px-4"
          role="login-button">
          {submit}
        </button>
        <div className="text-center">
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
