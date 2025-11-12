import AdminNav from '@/components/admin/AdminNav';
import { headers } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isLoginPage = false;
  try {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';
    isLoginPage = pathname === '/admin/login';
  } catch (error) {
    // If headers are not available, continue with normal layout
    console.error('Error reading headers:', error);
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}

