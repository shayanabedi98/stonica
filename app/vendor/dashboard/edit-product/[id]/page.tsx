import Container from "@/components/Container";
import PostForm from "@/components/forms/PostForm";
import GoBack from "@/components/other/GoBack";
import prisma from "@/lib/db";
import getAuthUser from "@/utils/getAuthUser";
import isSignedIn from "@/utils/isSignedIn";

export default async function editProduct({
  params,
}: {
  params: { id: string };
}) {
  await isSignedIn("vendor");
  const pubKey = process.env.UPLOAD_CARE_PUBLIC_KEY;
  const user = await getAuthUser("select", {
    companyName: true,
    city: true,
    image: true,
    phone: true,
    stateProvince: true,
  });
  const { id } = params;
  let post;

  try {
    post = await prisma.post.findUnique({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="ancestor-container">
      <Container>
        <GoBack href="/vendor/dashboard" content="Dashboard" />
        <h1 className="mb-4 text-center">Update Product</h1>
        <h2 className="mx-auto mb-20 text-center lg:w-1/2">
          Build your next product post with a preview of what others will see.
          Don&apos;t worry, you&apos;ll be able to change it later.
        </h2>
        <div className="flex justify-center">
          {post && (
            <PostForm
              postData={post}
              user={user}
              pubKey={pubKey!}
              fetchMethod="PUT"
            />
          )}
        </div>
      </Container>
    </div>
  );
}
