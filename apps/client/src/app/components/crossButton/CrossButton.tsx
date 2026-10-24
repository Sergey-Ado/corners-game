interface props {
  onCloseHandler: () => void;
}

export default function CrossButton({ onCloseHandler }: props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      role="settings-close"
      className="size-8 absolute right-2 top-2 hover:cursor-pointer hover:bg-hover-light dark:hover:bg-hover-dark rounded-2xl p-1 duration-200"
      onClick={onCloseHandler}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}
