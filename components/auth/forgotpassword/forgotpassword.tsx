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
import { useSearchParams } from "next/navigation";
import CardWrapper from "../card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ForgotPasswordForm = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("requestOtp");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const role = searchParams.get("role"); // This can be used for your API requests

  const form = useForm({
    defaultValues: {
      email: "",
      otp: "",
      NewPassword: "",
      confirmPassword: "",
    },
  });

  const requestOtp = async (data: { email: string }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4500/${role}/request-otp`, // Role is still used here
        { email: data.email }
      );
      if (response.data.message) {
        setEmail(data.email);
        setStep("verifyOtp");
      } else {
        alert(response.data.error);
      }
    } catch (error: any) {
      alert(error.response?.data.error || "Server is down. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (data: { email: string; otp: string }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4500/${role}/verify-otp`, // Role is still used here
        { email: data.email, otp: data.otp }
      );
      if (response.data.message) {
        setOtp(data.otp);
        setStep("resetPassword");
      } else {
        alert(response.data.error);
      }
    } catch (error: any) {
      alert(error.response?.data.error || "Server is down. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: { NewPassword: string }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4500/${role}/forgotpassword`, // Role is still used here
        {
          email: email,
          otp: otp,
          NewPassword: data.NewPassword,
        }
      );
      if (response.data.message) {
        alert(response.data.message);
        window.location.href = `/auth/login?role=${role}`;
      } else {
        alert(response.data.error);
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Server is down. Please try again later.");
      }
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardWrapper
      label="Forgot your password?"
      title="Reset Password"
      backButtonHref={`/auth/login?role=${role}`} // Role is still used here
      backButtonLabel="Remembered your password? Login here."
    >
      {step === "requestOtp" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(requestOtp)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="johndoe@gmail.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Request OTP"}
            </Button>
          </form>
        </Form>
      )}
      {step === "verifyOtp" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(verifyOtp)} className="space-y-6">
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
                        value={email}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Verify OTP"}
            </Button>
          </form>
        </Form>
      )}
      {step === "resetPassword" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="NewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
