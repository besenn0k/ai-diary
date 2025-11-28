import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <MailCheck className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Проверьте вашу почту</CardTitle>
          <CardDescription className="text-base">
            Мы отправили ссылку для подтверждения на ваш email.
            <br />
            Пожалуйста, перейдите по ней, чтобы активировать аккаунт.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          <p>Не получили письмо? Проверьте папку "Спам".</p>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full" variant="outline">
            <Link href="/login">
              Вернуться ко входу
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
