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
import { useState, useEffect } from "react";
import CardWrapper from "../card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("requestOtp");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const requestOtpForm = useForm({
    defaultValues: {
      email: "",
    },
  });

  const verifyOtpForm = useForm({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const registerForm = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    verifyOtpForm.reset({ email });
    registerForm.reset({ email });
  }, [email, verifyOtpForm, registerForm]);

  const onRequestOtp = async (data) => {
    setLoading(true);
    try {
      console.log("request otp: ", data);
      const response = await axios.post(
        `http://localhost:4500/developer/request-otp`, // Update the endpoint based on your backend setup
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

  const onVerifyOtp = async (data) => {
    setLoading(true);
    try {
      console.log("verify otp: ", data);
      const response = await axios.post(
        `http://localhost:4500/developer/verify-otp`, // Update the endpoint based on your backend setup
        {
          email: data.email,
          otp: data.otp,
        }
      );
      if (response.data.message) {
        setOtp(data.otp);
        setStep("completeRegistration");
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

  const onCompleteRegistration = async (data) => {
    setLoading(true);
    try {
      console.log("complete registration: ", data);
      const response = await axios.post(
        `http://localhost:4500/developer/signup`, // Update the endpoint based on your backend setup
        {
          email: email,
          username: data.username,
          password: data.password,
          otp: otp,
        }
      );
      if (response.data.message) {
        alert(response.data.message);
        window.location.href = `/auth/login`;
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

  return (
    <CardWrapper
      label="Create an account"
      title="Register"
      backButtonHref={`/auth/login`}
      backButtonLabel="Already have an account? Login here."
      forgotPasswordHref={`/auth/forgotpassword`}
      forgotPasswordLabel="Forgot password?"
    >
      {step === "requestOtp" && (
        <Form {...requestOtpForm}>
          <form onSubmit={requestOtpForm.handleSubmit(onRequestOtp)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={requestOtpForm.control}
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
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Request OTP"}
            </Button>
          </form>
        </Form>
      )}
      {step === "verifyOtp" && (
        <Form {...verifyOtpForm}>
          <form onSubmit={verifyOtpForm.handleSubmit(onVerifyOtp)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={verifyOtpForm.control}
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
                control={verifyOtpForm.control}
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
      {step === "completeRegistration" && (
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onCompleteRegistration)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="JohnDoe123" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};

export default RegisterForm;
