import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import CloseButton from './CloseButton';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export default function Alert({ message, type, onClick }: { message?: string; type?: string; onClick: any }) {
  return (
    <div
      className={classNames(
        type === 'success' ? 'bg-green-50' : 'bg-rose-50',
        'p-4 absolute right-0 top-0 z-50 w-screen md:w-fit',
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
          ) : (
            <ExclamationTriangleIcon className="h-5 w-5 mt-0.5 text-rose-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3 flex">
          <p className={classNames(type === 'success' ? 'text-green-800 ' : 'text-rose-800 ', 'text-base')}>
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3 -my-0.5">
          <CloseButton
            classes={classNames(
              type === 'success'
                ? 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600'
                : 'bg-rose-50 text-rose-500 hover:bg-rose-100 focus:ring-rose-600',
              'inline-flex  rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 ',
            )}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}
