import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { MailCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function VerifyEmailPage() {
  const t = useTranslations("Auth");
  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <MailCheck className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">{t('verify.title')}</CardTitle>
        <CardDescription className="text-base">
          {t('verify.description')}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p>{t('verify.spam_hint')}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button asChild className="w-full" variant="outline">
          <Link href="/login">
            {t('verify.return')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
