import ModalWrapper from '@components/modalWrapper/ModalWrapper';
import clsx from 'clsx';
import CrossButton from '@components/crossButton/CrossButton';
import ThemeSwitcher from '../switchers/themeSwitcher/ThemeSwitcher';
import LangSwitcher from '../switchers/langSwitcher/LangSwitcher';
import { useDispatch } from 'react-redux';
import { changeShowSettings } from '@/app/store/generalSlice';

export default function SettingsModal() {
  const dispatch = useDispatch();

  const onCloseHandler = () => dispatch(changeShowSettings(false));

  return (
    <ModalWrapper>
      <div
        className={clsx(
          'bg-primary-light dark:bg-secondary-dark ',
          'p-5 w-60 relative border rounded-lg',
          'flex flex-col items-end gap-5 capitalize'
        )}
        role="settings-modal">
        <span className="self-center mb-3 text-3xl">Settings</span>
        <div className="flex items-center gap-5">
          <span>Theme</span>
          <ThemeSwitcher />
        </div>
        <div className="flex items-center gap-5">
          <span>Language</span>
          <LangSwitcher />
        </div>
        <CrossButton onCloseHandler={onCloseHandler} />
      </div>
    </ModalWrapper>
  );
}
