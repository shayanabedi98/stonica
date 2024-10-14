type Props = {
  content: string | JSX.Element;
  styles?: string;
  onClick?: () => void;
};

export default function Btn({ onClick, content, styles }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles} ${styles?.includes("bg-secondary") ? "text-primary" : "border-secondary text-secondary"} flex min-w-32 items-center justify-center rounded-full border-2 px-2 py-2 text-sm font-semibold transition duration-150 lg:hover:border-primary lg:hover:bg-black lg:hover:text-primary`}
    >
      {content}
    </button>
  );
}
