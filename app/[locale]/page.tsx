import { routing } from "@/i18n/routing"
import { useTranslations } from "next-intl";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main className="p-8">
      <h1>{t("title")}</h1>
    </main>
  );
}
