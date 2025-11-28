"use client";

import { useState, useTransition } from "react";
import { loginAction, signupAction, resetPasswordAction } from "./actions";

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
          <CardTitle>Восстановление пароля</CardTitle>
          <CardDescription>
            Введите email, и мы отправим ссылку для сброса.
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
              <Label htmlFor="reset-email">Email</Label>
              <Input id="reset-email" name="email" type="email" required placeholder="name@example.com" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Отправить ссылку
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setView('auth')}
              type="button"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Вернуться ко входу
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Вход</TabsTrigger>
        <TabsTrigger value="register">Регистрация</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>С возвращением!</CardTitle>
            <CardDescription>Введите данные для входа.</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => handleSubmit(e, 'login')}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <button
                    type="button"
                    onClick={() => setView('forgot_password')}
                    className="text-xs text-muted-foreground hover:text-black hover:underline"
                  >
                    Забыли пароль?
                  </button>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Войти
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Создать аккаунт</CardTitle>
            <CardDescription>Заполните данные для регистрации.</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => handleSubmit(e, 'register')}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md font-medium">
                  {error}
                </div>
              )}
              {/* Поле ИМЯ */}
              <div className="space-y-1">
                <Label htmlFor="fullName">Имя</Label>
                <Input id="fullName" name="fullName" type="text" placeholder="Елена" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" name="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="reg-password">Пароль</Label>
                <Input id="reg-password" name="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Создать аккаунт
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
