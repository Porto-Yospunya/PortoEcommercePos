"use client";

import { ErrorAlert } from "@/components/ui/alert";
import { userSchema, UserSchemaType } from "@/schemas/user.schema";
import { insertUser } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Register() {

  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(userSchema) });
  const router = useRouter();

  const onSubmit = async (data: UserSchemaType) => {
    try {
      const res = await insertUser(data);
      console.log(res);
      router.push("/sign-in");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (session?.user) {
      if (session?.user?.role === "ADMIN") {
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
          <label>Username</label>
          <input type="text" {...register("name")} />
          {errors.name && <ErrorAlert message={errors.name.message} />}
        </label>

        <label>
          <label>Email</label>
          <input type="text" {...register("email")} />
          {errors.email && <ErrorAlert message={errors.email.message} />}
        </label>

        <label>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <ErrorAlert message={errors.password.message} />}
        </label>

        <label>
          <label>Confirm Password</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <ErrorAlert message={errors.confirmPassword.message} />}
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}