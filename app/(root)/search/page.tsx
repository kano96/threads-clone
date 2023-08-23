import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
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

  const result = await fetchUsers({ userId: user.id, searchString: "" });
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      {/** Search bar */}
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="text-center">No users found.</p>
        ) : (
          <>
            {result.users.map((person) => (
              <p className="text-white">{person.name}</p>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
