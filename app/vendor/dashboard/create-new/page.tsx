import Container from "@/components/Container";
import PostForm from "@/components/forms/PostForm";
import GoBack from "@/components/other/GoBack";
import getAuthUser from "@/utils/getAuthUser";
import isSignedIn from "@/utils/isSignedIn";

export default async function CreateNew() {
  await isSignedIn("vendor");
  const pubKey = process.env.UPLOAD_CARE_PUBLIC_KEY;
  const user = await getAuthUser("select", {
    companyName: true,
    city: true,
    image: true,
    phone: true,
    stateProvince: true,
  });

  return (
    <div className="ancestor-container">
      <Container>
        <GoBack href="/vendor/dashboard" content="Dashboard" />
        <h1 className="mb-4 text-center">Create a Post</h1>
        <h2 className="lg:w-1/2 text-center mx-auto mb-20">
          Build your next product post with a preview of what others will see. Don&apos;t worry,
          you&apos;ll be able to change it later.
        </h2>
        <div className="flex justify-center">
          <PostForm user={user} pubKey={pubKey!} fetchMethod="POST" />
        </div>
      </Container>
    </div>
  );
}
