import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from 'next-intl/server';
import LanguageSwitcher from "@/components/ui/LanguageSwitcher"
import UserMenu from "@/components/UserMenu";
import { createClient } from "@/lib/supabase/server";
import "../globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <header className="p-4 border-b flex justify-between">
            <span className="font-semibold">My Project</span>
            <div className="flex gap-2 justify-between">
              <LanguageSwitcher />
              <UserMenu user={user} />
            </div>
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
