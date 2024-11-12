export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[95%] xl:max-w-screen-xl">{children}</div>
  );
}
