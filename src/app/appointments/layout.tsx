import ClientProtectedLayout from "@/components/clientProtectedLayout";

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <ClientProtectedLayout>
            <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-6">
        {children}
      </div>
    </div>
    </ClientProtectedLayout>
  );
} 