"use client"; // Ensure this component is client-side

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Code Bounty</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400&family=Jersey+Regular&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        style={{
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          fontFamily: 'Roboto, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: 'Jersey, sans-serif',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white', // Keep the header text white
            }}
          >
            Bounty Code
          </div>
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <a
              href="#"
              style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}
            >
              Our Goal
            </a>
            <span style={{ color: 'white' }}>|</span>
            <a
              href="#"
              style={{
                backgroundColor: '#800080', // Purple
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Log In / Sign Up
            </a>
          </nav>
        </header>

        {/* Main Section */}
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Semi-transparent box for the text */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% transparency
            padding: '20px',
            borderRadius: '10px',
            display: 'inline-block', // Make the box fit the text
          }}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px', fontWeight: 'bold', color: 'white' }}>
              The new way to learn how to code while having fun.
            </h1>
          </div>
          <a
            href="#"
            style={{
              backgroundColor: '#800080', // Purple
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Subtle shadow for the button
            }}
          >
            Learn More
          </a>
        </main>
      </div>
    </>
  );
}
