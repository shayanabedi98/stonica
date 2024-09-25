"use client";

type Props = {
  label: string;
  name: string;
  disabled?: boolean;
  notRequired?: boolean;
  value: number | string;
  autoComplete?: string;
  showPasswordOption?: boolean;
  options: string[];
  onChange: (str1: string, str2: string) => void;
};

export default function Select({
  label,
  name,
  onChange,
  value,
  options,
  disabled,
  notRequired,
  autoComplete,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-sm font-semibold" htmlFor={name}>
        {label}
      </label>
      <select
        disabled={disabled}
        autoComplete={autoComplete}
        required={notRequired ? false : true}
        value={value}
        className={`rounded-sm bg-neutral-200 p-1 text-sm font-semibold text-primary placeholder:font-normal placeholder:text-neutral-500 ${disabled ? "cursor-not-allowed text-neutral-500" : ""}`}
        name={name}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      >
        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
