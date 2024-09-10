type Props = {
  label: string;
  name: string;
  type: string;
  onChange: (str1: string, str2: string) => void;
};

export default function Input({ label, name, type, onChange }: Props) {
  return (
    <div className="flex w-full flex-col">
      <label className="font-semibold" htmlFor={name}>{label}</label>
      <input
        className=""
        type={type}
        name={name}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
    </div>
  );
}
