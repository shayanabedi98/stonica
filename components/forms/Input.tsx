type Props = {
  label: string;
  name: string;
  type: string;
  disabled?: boolean;
  notRequired?: boolean;
  placeholder: string;
  value: number | string;
  autoComplete?: string;
  pattern?: string;
  onChange: (str1: string, str2: string) => void;
};

export default function Input({
  label,
  name,
  type,
  onChange,
  placeholder,
  value,
  disabled,
  notRequired,
  autoComplete,
  pattern,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-sm font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        pattern={pattern}
        disabled={disabled}
        minLength={type == "password" ? 8 : 1}
        autoComplete={autoComplete}
        required={notRequired ? false : true}
        value={value}
        placeholder={placeholder}
        className={`rounded-sm bg-neutral-200 p-1 text-sm font-semibold text-primary placeholder:font-normal placeholder:italic placeholder:text-neutral-500 ${disabled ? "cursor-not-allowed text-neutral-500" : ""}`}
        type={type}
        name={name}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
    </div>
  );
}
