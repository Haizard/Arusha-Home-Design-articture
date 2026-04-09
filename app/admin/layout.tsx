import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Arusha Home Design',
  description: 'Control your website content',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {children}
    </div>
  );
}
