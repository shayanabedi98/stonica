type Props = {
  content: string | JSX.Element;
  styles?: string;
  type?: "submit";
  onClick?: () => void;
};

export default function Btn({ onClick, content, styles, type }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles} ${styles?.includes("bg-secondary") ? "text-primary" : "text-secondary"} flex min-w-32 items-center justify-center rounded-full px-2 py-3 text-sm font-semibold shadow-lg transition duration-150 lg:hover:bg-opacity-85 lg:hover:shadow`}
    >
      {content}
    </button>
  );
}
