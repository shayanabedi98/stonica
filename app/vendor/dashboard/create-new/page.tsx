import Container from "@/components/Container";
import PostForm from "@/components/forms/PostForm";
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
        <div>
          <PostForm user={user} pubKey={pubKey!} task="create" />
        </div>
      </Container>
    </div>
  );
}
