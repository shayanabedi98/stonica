import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function CreateNewPost() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2>You don&apos;t have any posts to show</h2>
      <Link
        href={"/vendor/dashboard/create-new"}
        className="flex flex-col items-center justify-center gap-2 rounded-md bg-secondary p-6 text-primary shadow-lg transition lg:hover:bg-hover"
      >
        <FiPlus className="text-3xl" />
        <p className="text-lg font-semibold">Create Product</p>
      </Link>
    </div>
  );
}
