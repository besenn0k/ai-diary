"use client";

import { useState, useTransition } from "react";
import { updatePassword } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function UpdatePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await updatePassword(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Новый пароль</CardTitle>
        <CardDescription>
          Придумайте новый надежный пароль для вашего аккаунта.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md font-medium">
              {error}
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="password">Новый пароль</Label>
            <Input id="password" name="password" type="password" required minLength={6} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Обновить пароль
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
