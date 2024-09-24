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
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";

export default async function Dashboard() {
  await isSignedIn("vendor");
  await isAccountSetup("dashboard");
  const session = await getServerSession(authOptions);
  let user;

  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    if (!user?.companyName || !user?.latitude || !user?.longitude) {
      redirect("/vendor/account-setup");
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
        className="flex min-h-32 min-w-56 flex-col items-center justify-between rounded-md bg-secondary px-4 py-6 text-primary shadow-lg transition lg:hover:bg-accent"
      >
        <div className="text-4xl">{icon}</div>
        <p className="text-xl font-bold">{title}</p>
      </Link>
    );
  };

  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded-full border-4 p-2">
            <Image
              src={user?.image || "/assets/avatar.png"}
              alt=""
              height={270}
              width={270}
              quality={100}
              className="rounded-full"
            />
          </div>
          <h1>Welcome, {user?.companyName || user?.name}!</h1>
          <div className="flex flex-col items-center gap-4">
            <h3>Dashboard</h3>
            <p className="text-2xl font-bold text-neutral-400">
              Update your inventory, account information, or create a new
              product
            </p>
            <div className="mt-10 flex gap-6">
              <DashboardOptions
                icon={<MdOutlineContactSupport />}
                href="/vendor/support"
                title="Support"
              />
              <DashboardOptions
                icon={<BsPencilFill />}
                href="/vendor/dashboard/edit-account"
                title="Edit Account"
              />
              <div className="relative flex min-h-32 min-w-56 cursor-not-allowed flex-col items-center justify-between rounded-md bg-neutral-400 px-4 py-6 text-primary shadow-lg">
                <span className="absolute top-0 rounded-b-md bg-primary bg-opacity-30 px-2 py-1 text-xs text-secondary">
                  Coming soon
                </span>
                <div className="text-4xl">
                  <IoAnalyticsSharp />
                </div>
                <p className="text-xl font-bold">Analytics</p>
              </div>
              <DashboardOptions
                icon={<FiPlus />}
                href="/vendor/dashboard/create-new"
                title="Create New"
              />
            </div>
          </div>
          {/* <EmergencySignOut /> */}
        </div>
      </Container>
    </div>
  );
}
