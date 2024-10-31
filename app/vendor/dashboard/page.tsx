import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/Container";
// import EmergencySignOut from "@/components/other/EmergencySignOut";
import prisma from "@/lib/db";
import isAccountSetup from "@/utils/isAccountSetup";
import isSignedIn from "@/utils/isSignedIn";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { BsPencilFill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { MdOutlineContactSupport } from "react-icons/md";
import Card from "@/components/products/Card";
import CreateNewPost from "@/components/dashboard/CreateNewPost";

export default async function Dashboard() {
  await isSignedIn("vendor");
  await isAccountSetup("dashboard");

  const session = await getServerSession(authOptions);
  let user;
  let posts;

  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    if (!user?.companyName || !user?.latitude || !user?.longitude) {
      redirect("/vendor/account-setup");
    }
    posts = await prisma.post.findMany({
      where: { userId: user.id },
      include: { User: true },
    });

    if (posts.length < 1) {
      posts = null;
    }
  } catch (error) {
    console.log("failed to get user from db: " + error);
  }

  const DashboardOptions = ({
    href,
    title,
    icon,
  }: {
    href: string;
    title: string;
    icon: JSX.Element;
  }) => {
    return (
      <Link
        href={href}
        className="flex min-h-11 w-full items-center gap-2 rounded-md bg-secondary px-1 text-primary transition lg:hover:bg-hover"
      >
        <div className="text-xl">{icon}</div>
        <p className="text-sm">{title}</p>
      </Link>
    );
  };

  return (
    <div className="ancestor-container relative opacity-95">
      <div className="sidebar fixed top-20 -z-10 flex h-full w-44 flex-col items-center gap-4 bg-secondary px-4 pt-20 text-primary">
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full border p-1">
            <Image
              src={user?.image || "/assets/avatar.png"}
              alt="User profile picture"
              height={66}
              width={66}
              className="rounded-full"
            />
          </div>
          <p className="text-center text-lg font-semibold">
            {user?.companyName}
          </p>
        </div>
        <hr className="h-1 w-full" />
        <DashboardOptions
          icon={<FiPlus />}
          href="/vendor/dashboard/create-new"
          title="Create New"
        />
        <DashboardOptions
          icon={<BsPencilFill />}
          href="/vendor/edit-account"
          title="Edit Account"
        />
        <DashboardOptions
          icon={<FaGear />}
          href="/vendor/dashboard/settings"
          title="Settings"
        />
        <DashboardOptions
          icon={<MdOutlineContactSupport />}
          href="/vendor/support"
          title="Support"
        />

        {/* <div className="relative flex min-h-32 min-w-56 cursor-not-allowed flex-col items-center justify-between rounded-md bg-hover px-4 py-6 text-primary shadow-lg">
          <span className="absolute top-0 rounded-b-md bg-primary bg-opacity-30 px-2 py-1 text-xs text-secondary">
            Coming soon
          </span>
          <div className="text-4xl">
            <IoAnalyticsSharp />
          </div>
          <p className="text-xl font-bold">Analytics</p>
        </div> */}
      </div>
      <Container>
        <h1 className="mb-20 text-center">Manage Products</h1>
        {posts ? (
          <div className="flex items-center justify-center gap-20">
            {posts.map((post, index) => (
              <Card key={index} formData={post} user={post.User} />
            ))}
          </div>
        ) : (
          <div>
            <CreateNewPost />
          </div>
        )}
      </Container>
    </div>
  );
}
