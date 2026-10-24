import clsx from 'clsx';
import { ReactNode } from 'react';

interface props {
  children: ReactNode;
}

export default function ModalWrapper({ children }: props) {
  return (
    <div
      className={clsx(
        'fixed left-0 top-0 size-full',
        'bg-[#00000034] backdrop-blur-[2px]',
        'flex justify-center items-center'
      )}>
      {children}
    </div>
  );
}
