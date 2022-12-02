function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Button({
  type,
  className,
  onClick,
  children,
}: {
  type?: any;
  className: string;
  onClick?: any;
  children: any;
}) {
  return (
    <button
      type={type}
      className={classNames(
        className === 'primary' ? 'bg-sky-900 text-white hover:bg-sky-600 focus:ring-sky-900' : '',
        className === 'secondary'
          ? 'bg-pink-500 border-pink-300 focus:ring-pink-500'
          : '',
        className === 'delete' ? 'bg-rose-600 border-gray-300 focus:ring-red hover:shadow-gray-400' : '',
        'w-44 inline-flex items-center justify-center rounded-lg border border-transparent px-4 py-1.5 text-lg duration-300 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2  focus:ring-offset-2',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
