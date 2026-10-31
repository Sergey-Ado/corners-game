import { Pages } from '@/types/general.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput } from '@repo/shared/user';
import { RegisterInputSchema } from '@repo/shared/user-schema';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Endpoints } from '@repo/shared/api';
import { getServerUrl } from '@/utils/getServerUrl';

const serverUrl = getServerUrl();

export default function RegisterPage() {
  const { t } = useTranslation();

  const title = t('register.title');
  const email = t('register.email');
  const username = t('register.username');
  const password = t('register.password');
  const submit = t('register.button');
  const registerDesc = t('register.login.desc');
  const registerLInk = t('register.login.link');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterInputSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    console.log(data);

    const body = JSON.stringify(data);
    const response = await fetch(`${serverUrl}${Endpoints.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body,
    });

    if (response.ok) {
      console.log(await response.json());
    }
  };

  return (
    <main className="visual-panel p-2 grow flex items-center justify-center">
      <form
        className="flex flex-col gap-4 w-full max-w-2xs"
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className="capitalize self-center font-bold text-xl">{title}</h2>
        <div className="flex flex-col">
          <label htmlFor="register-email" className="capitalize mb-1">
            {email}
          </label>
          <input
            type="text"
            id="register-email"
            className="input"
            role="input-email"
            {...register('email')}
          />
          {errors.email?.message && (
            <p role="error-email">{t(errors.email.message)}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="register-username" className="capitalize mb-1">
            {username}
          </label>
          <input
            type="text"
            id="register-username"
            className="input"
            role="input-username"
            {...register('username')}
          />
          {errors.username?.message && (
            <p role="error-username">{t(errors.username.message)}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="register-password" className="capitalize mb-1">
            {password}
          </label>
          <input
            type="text"
            id="register-password"
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
          role="register-button">
          {submit}
        </button>
        <div className="text-center">
          <span>{registerDesc}</span>
          <Link
            to={`/${Pages.LOGIN}`}
            className="hover:text-third-light dark:hover:text-hover-dark can-dur:duration-300 underline"
            role="login-link">
            {registerLInk}
          </Link>
        </div>
      </form>
    </main>
  );
}
