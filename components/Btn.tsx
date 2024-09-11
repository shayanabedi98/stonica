type Props = {
  content: string | JSX.Element;
  styles?: string;
  onClick?: () => void;
};

export default function Btn({ onClick, content, styles }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles} ${styles?.includes("bg-secondary") ? "text-primary" : ""} flex min-w-32 items-center transition duration-150 justify-center rounded-md border-2 px-2 py-2 text-sm font-semibold lg:hover:bg-accent lg:hover:text-primary`}
    >
      {content}
    </button>
  );
}
