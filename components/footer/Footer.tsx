import FooterItem from "./FooterItem";

export default function Footer() {
  return (
    <footer className="flex h-14 items-center justify-between px-6 text-xs text-accent">
      <div>
        &copy; {new Date().getFullYear()} Stonica Group. All rights Reserved.
      </div>
      <div className="flex items-center justify-center gap-4">
        <FooterItem href="/privacy" content="Privacy" />
        <FooterItem href="/Terms" content="Terms" />
        <FooterItem href="/about" content="About" />
        <FooterItem href="/contact" content="Contact" />
      </div>
    </footer>
  );
}
