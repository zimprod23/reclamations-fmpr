// app/(student)/layout.tsx
import StudentNavbar from "@/ui/student/navbar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <StudentNavbar />
      <main className="pb-32 md:pb-10">
        {" "}
        {/* Extra padding bottom for mobile bar */}
        {children}
      </main>
    </div>
  );
}
