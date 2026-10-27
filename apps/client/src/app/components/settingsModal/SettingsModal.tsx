import ModalWrapper from '@components/modalWrapper/ModalWrapper';
import clsx from 'clsx';
import CrossButton from '@components/crossButton/CrossButton';
import ThemeSwitcher from '../switchers/themeSwitcher/ThemeSwitcher';
import LangSwitcher from '../switchers/langSwitcher/LangSwitcher';
import { useDispatch } from 'react-redux';
import { changeShowSettings } from '@/app/store/generalSlice';
import { useTranslation } from 'react-i18next';

export default function SettingsModal() {
  const dispatch = useDispatch();

  const onCloseHandler = () => dispatch(changeShowSettings(false));

  const { t } = useTranslation();

  const title = t('settings.title');
  const theme = t('settings.theme');
  const language = t('settings.language');

  return (
    <ModalWrapper>
      <div
        className={clsx(
          'bg-primary-light dark:bg-primary-dark ',
          'p-5 w-60 relative border rounded-lg',
          'flex flex-col items-end gap-5 capitalize'
        )}
        role="settings-modal">
        <span className="self-center mb-3 text-3xl">{title}</span>
        <div className="flex items-center gap-5">
          <span>{theme}</span>
          <ThemeSwitcher />
        </div>
        <div className="flex items-center gap-5">
          <span>{language}</span>
          <LangSwitcher />
        </div>
        <CrossButton onCloseHandler={onCloseHandler} />
      </div>
    </ModalWrapper>
  );
}
