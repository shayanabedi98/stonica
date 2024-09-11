type Props = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: number | string
  autoComplete?: string;
  onChange: (str1: string, str2: string) => void;
};

export default function Input({
  label,
  name,
  type,
  onChange,
  placeholder,
  value,
  autoComplete,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-sm font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        minLength={type == "password" ? 8 : 1}
        autoComplete={autoComplete}
        required
        value={value}
        placeholder={placeholder}
        className="rounded-sm bg-neutral-300 p-1 text-sm text-primary placeholder:text-neutral-700"
        type={type}
        name={name}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
    </div>
  );
}
