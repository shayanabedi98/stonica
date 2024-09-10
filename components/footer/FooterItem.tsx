import Link from "next/link";

type Props = {
  href: string;
  content: string;
};

export default function FooterItem({ href, content }: Props) {
  return (
    <Link href={href} className="lg:hover:underline">
      {content}
    </Link>
  );
}
