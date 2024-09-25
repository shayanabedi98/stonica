import Container from "@/components/Container";
import PostForm from "@/components/forms/PostForm";
import isSignedIn from "@/utils/isSignedIn";

export default async function CreateNew() {
  await isSignedIn("vendor");
  const pubKey = process.env.UPLOAD_CARE_PUBLIC_KEY;

  return (
    <div className="ancestor-container">
      <Container>
        <div>
          <PostForm pubKey={pubKey!} task="create" />
        </div>
      </Container>
    </div>
  );
}
