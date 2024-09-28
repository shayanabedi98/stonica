export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[95%] xl:max-w-[1280px]">{children}</div>
  );
}
