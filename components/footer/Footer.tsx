import { FaInstagram } from "react-icons/fa";
import Container from "../Container";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

const FooterItem = ({
  href,
  content,
  blank,
}: {
  href: string;
  content: string | JSX.Element;
  blank?: boolean;
}) => {
  return (
    <Link
      target={blank ? "_blank" : ""}
      href={href}
      className="lg:hover:underline"
    >
      {content}
    </Link>
  );
};

const FooterItemHeader = ({ content }: { content: string }) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <p className="text-sm font-semibold">{content}</p>
      <hr className="w-10 border-b border-color3" />
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="flex min-h-44 items-center bg-black pb-10 pt-20 text-xs text-secondary">
      <Container>
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex flex-col items-center justify-center">
            <Link
              className="logo text-3xl font-semibold tracking-widest"
              href={"/"}
            >
              STONICA
            </Link>
            <p className="text-neutral-300">
              The Hub for Stone Seekers &amp; Suppliers
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <FooterItemHeader content="Company" />
            <FooterItem href="/privacy" content="Privacy Policy" />
            <FooterItem href="/Terms" content="Terms of Service" />
            <FooterItem href="/about" content="About Us" />
            <FooterItem href="/contact" content="Contact" />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <FooterItemHeader content="Navigate" />
            <FooterItem href="/" content="Home" />
            <FooterItem href="/products" content="Products" />
            <FooterItem href="/join" content="Join" />
            <FooterItem href="/sign-in" content="Sign In" />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <FooterItemHeader content="Other" />
            <FooterItem href="/ask-mike" content="Ask Mike" />
            <div className="flex gap-2 text-xl">
              <FooterItem
                href="https://www.instagram.com/"
                blank
                content={<FaInstagram />}
              />
              <FooterItem
                href="https://www.instagram.com/"
                blank
                content={<IoMailOutline />}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <EmailSubscriptionForm />
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-1">
          &copy; {new Date().getFullYear()} Stonica Group. All rights Reserved.
          Created by
          <Link
            href={"https://shayanabedi.com"}
            target="_blank"
            className="font-semibold text-color3"
          >
            Shayan Abedi
          </Link>
        </div>
      </Container>
    </footer>
  );
}
