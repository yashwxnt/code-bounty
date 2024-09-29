import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bounty Code</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400&family=Jersey&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 text-white">
        {/* Header */}
        <header className="py-8 text-center">
          <h1 className="font-jersey text-6xl font-bold">Bounty Code</h1>
        </header>

        {/* Main Section */}
        <main className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              The new way to learn how to code while having fun.
            </h2>
            <p className="text-xl">
              Join our community of learners and start your coding journey today!
            </p>
          </div>

          {/* Auth Tabs */}
          <Card className="max-w-md mx-auto">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="forgot">Forgot</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Login</Button>
                </CardFooter>
              </TabsContent>
              <TabsContent value="signup">
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Create a new account to get started.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="text" placeholder="Username" />
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Sign Up</Button>
                </CardFooter>
              </TabsContent>
              <TabsContent value="forgot">
                <CardHeader>
                  <CardTitle>Forgot Password</CardTitle>
                  <CardDescription>Enter your email to reset your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="email" placeholder="Email" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Reset Password</Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Get Started Button */}
          <div className="text-center mt-12">
            <Link href="/lobby" passHref>
              <Button size="lg" className="bg-purple-700 hover:bg-purple-800">
                Get Started
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}