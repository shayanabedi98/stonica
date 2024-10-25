import Container from "@/components/Container";
import Card from "@/components/posts/Card";
import prisma from "@/lib/db";
import getAuthUser from "@/utils/getAuthUser";

export default async function Wishlist() {
  const user = await getAuthUser("select", { wishlist: true });
  let posts;

  try {
    posts = await prisma.post.findMany({
      where: { id: { in: user?.wishlist } },
      include: { User: true },
    });
  } catch (error) {}

  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center">
          <h1>Wishlist</h1>
          <div className="mt-20 flex gap-20">
            {posts?.map((i, index) => (
              <Card
                key={index}
                formData={i}
                user={i.User}
                signedInUser={user}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
