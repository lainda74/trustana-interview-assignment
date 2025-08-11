import React, { Suspense } from 'react';
import SideNav from "@/components/ui/side-nav";
import PageTitle from '@/components/ui/page-title';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNav />
      <main className="pt-8 w-full">
        <Suspense>
          <PageTitle />
        </Suspense>
        {children}
      </main>
    </div>
  );
}
