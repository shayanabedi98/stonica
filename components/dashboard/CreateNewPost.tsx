import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function CreateNewPost() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2>You don&apos;t have any posts to show</h2>
      <Link
        href={"/vendor/dashboard/create-new"}
        className="lg:hover:bg-hover flex flex-col items-center gap-2 justify-center rounded-md bg-secondary p-6 shadow-lg text-primary transition"
      >
        <FiPlus className="text-3xl" />
        <p className="text-lg font-semibold">Create Product</p>
      </Link>
    </div>
  );
}
