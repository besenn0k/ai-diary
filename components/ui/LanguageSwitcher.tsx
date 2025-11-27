"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  const locales = ["de", "en", "uk", "ru"];

  return (
    <div className="flex gap-2">
      {locales.map((cur) => (
        <button
          key={cur}
          onClick={() => handleLocaleChange(cur)}
          disabled={isPending || cur === locale}
          className={`px-3 py-1 rounded border text-sm transition-colors
            ${cur === locale ? "bg-primary text-white" : "hover:bg-muted"}
            ${isPending ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {cur.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
