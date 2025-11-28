"use client";

import { useState, useTransition } from "react";
import { loginAction, signupAction, resetPasswordAction } from "./actions";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Loader2, ArrowLeft } from "lucide-react";

export function AuthForm() {
  const t = useTranslations("Auth");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [view, setView] = useState<'auth' | 'forgot_password'>('auth');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    actionType: 'login' | 'register' | 'reset'
  ) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      let result;

      if (actionType === 'login') result = await loginAction(formData);
      else if (actionType === 'register') result = await signupAction(formData);
      else if (actionType === 'reset') result = await resetPasswordAction(formData);

      if (result?.error) {
        setError(result.error);
      }

      if (result?.success && result?.message) {
        setSuccessMessage(result.message);
      }
    });
  };

  if (view === 'forgot_password') {
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>{t('reset.title')}</CardTitle>
          <CardDescription>
            {t('reset.new_password_desc')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={(e) => handleSubmit(e, 'reset')}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md font-medium">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 text-green-700 text-sm p-3 rounded-md font-medium">
                {successMessage}
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="reset-email">{t('fields.email')}</Label>
              <Input id="reset-email" name="email" type="email" required placeholder="name@example.com" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full mt-4" type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('reset.submit_button')}
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setView('auth')}
              type="button"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('reset.back_button')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">{t('tabs.login')}</TabsTrigger>
        <TabsTrigger value="register">{t('tabs.register')}</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>{t('login.title')}</CardTitle>
            <CardDescription>{t('login.description')}</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => handleSubmit(e, 'login')}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-1">
                <Label htmlFor="email">{t('fields.email')}</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('fields.password')}</Label>
                  <button
                    type="button"
                    onClick={() => setView('forgot_password')}
                    className="text-xs text-muted-foreground hover:text-black hover:underline"
                  >
                    {t('login.forgot_password')}
                  </button>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full mt-4" type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('login.submit_button')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>{t('register.title')}</CardTitle>
            <CardDescription>{t('register.description')}</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => handleSubmit(e, 'register')}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-1">
                <Label htmlFor="fullName">{t('fields.name')}</Label>
                <Input id="fullName" name="fullName" type="text" placeholder={t('fields.name')} required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="reg-email">{t('fields.email')}</Label>
                <Input id="reg-email" name="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="reg-password">{t('fields.password')}</Label>
                <Input id="reg-password" name="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full mt-4" type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('register.submit_button')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
