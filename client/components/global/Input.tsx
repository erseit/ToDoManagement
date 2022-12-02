function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Input({
  classes,
  defaultValue,
  value,
  label,
  maxLength,
  type,
  required,
  onChange,
}: {
  classes?: string;
  defaultValue?: any;
  value?: any;
  label?: string;
  maxLength?: any;
  type?: string;
  required?: boolean;
  onChange: any;
}) {
  return (
    <>
      {label && <label className="block text-base font-medium sm:mt-px sm:pt-2">{label}</label>}
      <div className={classNames(classes ? classes : '', 'mt-1')}>
        <input
          type={type ? type : 'text'}
          maxLength={maxLength}
          className='bg-sky-900 w-full text-base text-slate-200 py-2.5 px-2 rounded-md shadow-sm'
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          min={type === 'number' ? 1 : undefined}
          required = {required ? true : false}
        />
      </div>
    </>
  );
}
