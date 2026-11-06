import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/admin" />
    </div>
  );
}
