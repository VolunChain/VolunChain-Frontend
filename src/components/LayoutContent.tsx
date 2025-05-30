"use client";

import Footer from "@/components/Footer";
import NotificationToast from "@/components/ui/NotificationToast";
import I18nProvider from "@/components/I18nProvider";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  return (
    <I18nProvider>
      <NotificationToast />
      <main className="flex-grow">{children}</main>
      <Footer />
    </I18nProvider>
  );
} 