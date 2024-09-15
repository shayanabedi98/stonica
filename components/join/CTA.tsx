import Link from "next/link";
import Btn from "../Btn";

type Props = {
  heading: string;
  description: string;
  href: string;
  content: string;
  icon: JSX.Element;
};

export default function CTA({
  heading,
  description,
  href,
  content,
  icon,
}: Props) {
  return (
    <div className="flex min-h-[510px] w-full flex-col items-center justify-between gap-6 px-16 py-10">
      <div className="text-8xl">{icon}</div>
      <h3>{heading}</h3>
      <div className="min-h-44">
        <p className="text-xl">{description}</p>
      </div>
      <Link href={href}>
        <Btn content={content} styles="min-w-44" />
      </Link>
    </div>
  );
}
