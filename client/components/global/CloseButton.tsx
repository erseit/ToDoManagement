import { XMarkIcon } from '@heroicons/react/20/solid';

export default function ExportButton({ classes, onClick }: { classes?: any; onClick: any }) {
  return (
    <div className="-mx-1.5 -my-0.5">
      <button
        className={
          classes
            ? classes
            : 'rounded-lg p-1.5 text-sky-500 hover:bg-sky-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-sky-900'
        }
        onClick={onClick}
      >
        <span className="sr-only">Dismiss</span>
        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
