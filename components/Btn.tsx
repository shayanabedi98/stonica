type Props = {
  content: string;
  styles?: string;
  onClick?: () => void;
};

export default function Btn({ onClick, content, styles }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles} ${styles?.includes("bg-secondary") ? "text-primary" : ""} lg:hover:text-primary lg:hover:bg-accent min-w-32 rounded-md border-2 px-2 py-2 text-sm font-semibold transition`}
    >
      {content}
    </button>
  );
}
