import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "@backend/constants/schemas/users";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { AxiosError } from "axios";
import { useAuth } from "../contexts/AuthProvider";

const formSchema = signupSchema
  .merge(z.object({ passwordConfirmation: z.string() }))
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

const SignupForm = () => {
  const { signup } = useAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", passwordConfirmation: "" },
  });

  const onSubmit = async ({ email, password }) => {
    await signup(email, password).catch((error) => {
      if (
        error instanceof AxiosError &&
        error.response?.data?.message != null
      ) {
        form.setError("root", { message: error.response.data.message });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            {form.formState.errors.root?.message && (
              <CardDescription className="text-red-500 dark:text-red-900">
                {form.formState.errors.root.message}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex flex-col w-full gap-4">
            <div className="grid gap-4 grid-cols-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 justify-end">
            <Button type="button" asChild variant="ghost">
              <Link to="/">Cancel</Link>
            </Button>
            <Button type="button" asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              variant="outline"
            >
              {form.formState.isSubmitting ? <LoadingSpinner /> : "Signup"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SignupForm;
