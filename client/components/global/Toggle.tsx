function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Toggle({ onChange, enabled }: { onChange: any; enabled: boolean }) {
  return (
    <button
      type="button"
      className={classNames(
        enabled ? 'bg-sky-500' : 'bg-sky-900',
        'mt-3 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
      )}
      role="switch"
      aria-checked="false"
      onClick={onChange}
    >
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          ' pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        )}
      />
    </button>
  );
}
