import { auth, signIn } from "../../../auth";
import { Metadata } from "next";
import { title } from "@/components/constants"; /* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */

export const metadata: Metadata = {
  title: title + " Login",
};

export default async function Login() {
  const session = await auth();
  console.log("Session", session);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {session && session.user && session.user.image && session?.user?.name && (
        <>
          <h1>You are signed as {session.user.name}</h1>
          <img
            className="rounded-full py-3"
            width={64}
            height={64}
            src={session.user.image}
            alt={session.user.name}
          />
        </>
      )}
      <form
        className={"pb-1"}
        action={async () => {
          "use server";
          await signIn("Instagram");
        }}
      >
        <button type="submit" className={"flex hover:bg-gray-200 p-5"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
            alt="Instagram"
            width={24}
            height={24}
          />
          <span className={"ml-2"}>Sign in with Instagram</span>
        </button>
      </form>
      <form
        className={"pt-1"}
        action={async () => {
          "use server";
          await signIn("Google");
        }}
      >
        <button type="submit" className={"flex hover:bg-gray-200 p-5"}>
          <img
            src={
              "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            }
            width={24}
            height={24}
            alt={"Google"}
          />{" "}
          <span className={"ml-2"}>Sign in with Google</span>
        </button>
      </form>
    </main>
  );
}
