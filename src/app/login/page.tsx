import { signIn } from "../../../auth";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        action={async () => {
          "use server";
          await signIn("instagram");
        }}
      >
        <button type="submit">Sign in with Instagram</button>
      </form>
    </main>
  );
}
