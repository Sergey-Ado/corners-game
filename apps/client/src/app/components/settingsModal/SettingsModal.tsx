import ModalWrapper from '@components/modalWrapper/ModalWrapper';
import clsx from 'clsx';
import CrossButton from '@components/crossButton/CrossButton';
import ThemeSwitcher from '../switchers/themeSwitcher/ThemeSwitcher';

const onCloseHandler = () => console.log('close');

export default function SettingsModal() {
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
        <CrossButton onCloseHandler={onCloseHandler} />
      </div>
    </ModalWrapper>
  );
}
