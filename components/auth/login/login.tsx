"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CardWrapper from "../card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import userInfo from "@/hooks/userInfo";

const LoginForm = () => {
  const username = userInfo((state) => state.username);
  const setusername = userInfo((state) => state.setusername);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("login: ", data.email, data.password);
      const response = await axios.post(
        `http://localhost:4500/developer/login`, // Changed to a direct login endpoint
        {
          username: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.username) {
        localStorage.setItem("username", response.data.username);
        setusername(response.data.username);
        console.log("username", username, response.data.username);
        window.location.href = '/bounty';
        console.log(response.data);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      alert(error.response?.data.error);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref={`/auth/register`}
      backButtonLabel="Don't have an account? Register here."
      forgotPasswordHref={`/auth/forgotpassword`}
      forgotPasswordLabel="Forgot password?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
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
                    <Input {...field} type="password" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
