import CommunityCard from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const result = await fetchCommunities({ searchString: "" });
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      {/** Search bar */}
      <div className="mt-14 flex flex-col gap-9">
        {result.communities.length === 0 ? (
          <p className="text-center">No communities found.</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
