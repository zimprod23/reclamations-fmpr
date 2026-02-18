// ui/student/latest-status.tsx
import { fetchLatestReclamation } from "@/lib/data";
import LatestStatusUI from "./latest-status-ui";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function LatestStatusWrapper() {
  const session = await getServerSession(authOptions);

  // Use optional chaining and cast to any if you haven't set up types.d.ts yet
  const userId = (session as any)?.user?.id;

  if (!userId) return <LatestStatusUI latest={null} />;

  const latest = await fetchLatestReclamation(userId);

  return <LatestStatusUI latest={latest} />;
}
