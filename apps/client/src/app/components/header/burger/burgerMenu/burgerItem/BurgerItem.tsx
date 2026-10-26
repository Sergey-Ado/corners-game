import { BurgerIconType } from '@/types/burger.types';
import BurgerIcon from './BurgerIcon';
import clsx from 'clsx';

interface props {
  iconType: BurgerIconType;
  title: string;
  onClick: () => void;
}

export default function BurgerItem({ iconType, title, onClick }: props) {
  return (
    <div
      className={clsx(
        'flex gap-2 p-2 cursor-pointer',
        ' hover:bg-hover-light duration-200 dark:hover:bg-hover-dark'
      )}
      onClick={onClick}>
      <BurgerIcon iconType={iconType} />
      <span>{title}</span>
    </div>
  );
}
