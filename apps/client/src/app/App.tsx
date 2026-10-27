import Header from '@components/header/Header';
import clsx from 'clsx';
import { Outlet } from 'react-router';
import SettingsModal from '@components/settingsModal/SettingsModal';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

export default function App() {
  const isShowSetting = useSelector(
    (state: RootState) => state.general.isShowSettings
  );

  return (
    <div
      className={clsx(
        'min-h-screen',
        'flex flex-col items-stretch',
        'bg-[url(/images/background-light.png)] dark:bg-[url(/images/background-dark.png)] bg-no-repeat bg-fixed bg-cover',
        'pt-2 pb-2',
        'font-rub select-none text-text-light dark:text-text-dark'
      )}>
      <div
        className={clsx(
          'ml-auto mr-auto w-full max-w-7xl pl-2 pr-2 grow',
          'flex flex-col gap-2'
        )}>
        <Header />
        <Outlet />
        {isShowSetting && <SettingsModal />}
      </div>
    </div>
  );
}
