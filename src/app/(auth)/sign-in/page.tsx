"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ErrorAlert } from "@/components/ui/alert";
import { loginSchema, LoginSchemaType } from "@/schemas/user.schema";
import { useEffect } from "react";

export default function Login() {

  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
  const router = useRouter();

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (session?.user) {
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [session, router]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <label>
          <label>Email</label>
          <input type="text" {...register("email")} />
          {errors.email && <ErrorAlert message={errors.email.message} />}
        </label>

        <label>
          <label>Password</label>
          <input type="text" {...register("password")} />
          {errors.password && <ErrorAlert message={errors.password.message} />}
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}