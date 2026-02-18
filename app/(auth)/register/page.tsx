import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./register-form"; // We will create this next

export default async function RegisterPage() {
  // This is safe here because this is a Server Component
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/student/dashboard");
  }

  return <RegisterForm />;
}
