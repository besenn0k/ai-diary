"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Check } from "lucide-react";

const localeNames: Record<string, string> = {
  de: "Deutsch",
  en: "English",
  uk: "Українська",
  ru: "Русский",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- next-intl
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  const locales = ["de", "en", "uk", "ru"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full w-9 h-9 p-0 font-bold text-[13px]"
          disabled={isPending}
        >
          <span>{locale.toUpperCase()}</span>
          <span className="sr-only">Сменить язык</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {locales.map((cur) => (
          <DropdownMenuItem
            key={cur}
            onClick={() => handleLocaleChange(cur)}
            className="cursor-pointer flex items-center justify-between min-w-[120px]"
          >
            <span className="flex items-center gap-2">
              {localeNames[cur] || cur.toUpperCase()}
            </span>

            {cur === locale && (
              <Check className="h-4 w-4 ml-2 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
