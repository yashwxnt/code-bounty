"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Code, Rocket, Heart, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion'; // Correctly import motion from framer-motion

export default function Home() {
  return (
    <>
      <Head>
        <title>Bounty Code</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-500 text-white overflow-hidden">
        {/* Header with animation */}
        <header className="py-8 text-center relative z-10">
          <motion.h1
            className="font-bold text-6xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: -50 }} // Initial state
            animate={{ opacity: 1, y: 0 }} // Animate to this state
            transition={{ duration: 0.5 }} // Animation duration
          >
            <a>Bounty Code</a>
          </motion.h1>
        </header>

        {/* Main Section */}
        <main className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center mb-12"
            initial={{ opacity: 0, scale: 0.5 }} // Initial state
            animate={{ opacity: 1, scale: 1 }} // Animate to this state
            transition={{ duration: 0.5 }} // Animation duration
          >
            <h2 className="text-4xl font-bold mb-4">
              Learn to code with fun challenges!
            </h2>
            <p className="text-xl mb-6">
              Join our community of learners and start your coding journey today!
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <div>
                <Code size={40} />
              </div>
              <div>
                <Rocket size={40} />
              </div>
              <div>
                <Heart size={40} />
              </div>
            </div>
          </motion.div>

          {/* Auth Tabs */}
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border-none">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-3 bg-white/20">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="forgot">Forgot</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription className="text-white"> {/* Changed to white */}
                    Enter your credentials to access your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="email" placeholder="Email" className="bg-white/30" />
                  <Input type="password" placeholder="Password" className="bg-white/30" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-700 hover:bg-purple-800">Login</Button>
                </CardFooter>
              </TabsContent>
              <TabsContent value="signup">
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription className="text-white"> {/* Changed to white */}
                    Create a new account to get started.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="text" placeholder="Username" className="bg-white/30" />
                  <Input type="email" placeholder="Email" className="bg-white/30" />
                  <Input type="password" placeholder="Password" className="bg-white/30" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-700 hover:bg-purple-800">Sign Up</Button>
                </CardFooter>
              </TabsContent>
              <TabsContent value="forgot">
                <CardHeader>
                  <CardTitle>Forgot Password</CardTitle>
                  <CardDescription className="text-white"> {/* Changed to white */}
                    Enter your email to reset your password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="email" placeholder="Email" className="bg-white/30" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-700 hover:bg-purple-800">Reset Password</Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </div>

          {/* Get Started Button */}
          <div className="text-center mt-12">
            <Link href="/lobby" passHref>
              <Button size="lg" className="bg-purple-700 hover:bg-purple-800 text-xl px-8 py-6">
                Get Started
                <Rocket className="ml-2" size={24} />
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-sm opacity-75">
            <p>© 2024 Bounty Code. All rights reserved.</p>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 hover:text-purple-300">
              <Github size={16} className="mr-1" /> Find us on GitHub
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
