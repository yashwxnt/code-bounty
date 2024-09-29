"use client"; // Ensure this component is client-side

import Head from "next/head";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

export default function MatchPage() {
  return (
    <>
      <Head>
        <title>Code Bounty - Match</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400&family=Jersey+Regular&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          fontFamily: "Roboto, sans-serif",
          position: "relative",
          overflow: "hidden",
          height: "100vh", // Ensures full viewport height
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "Jersey, sans-serif",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Bounty Code
          </div>
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <a
              href="#"
              style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
            >
              Our Goal
            </a>
            <span>|</span>
            <a
              href="#"
              style={{
                backgroundColor: "#800080", // Purple
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Log In / Sign Up
            </a>
          </nav>
        </header>

        {/* Main Section */}
        <Box
          display="flex"
          justifyContent="center" // Center the buttons horizontally
          alignItems="center"
          height="77%" // Full height of the container
          position="relative"
          zIndex={1}
        >
          <Box
            display="flex"
            justifyContent="space-between" // Space buttons evenly
            width="50%" // Adjust width as needed
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#800080", // Purple
                color: "white",
                margin: "10px", // Adds some spacing between buttons
                padding: "20px 40px", // Increase padding for larger buttons
                fontSize: "18px", // Make text larger
                flexGrow: 1, // Allow button to grow
              }}
              href="#"
            >
              Create Match
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#800080", // Purple
                color: "white",
                margin: "10px", // Adds some spacing between buttons
                padding: "20px 40px", // Increase padding for larger buttons
                fontSize: "18px", // Make text larger
                flexGrow: 1, // Allow button to grow
              }}
              href="#"
            >
              Join Match
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

