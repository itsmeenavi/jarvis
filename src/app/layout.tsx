// src/app/layout.tsx

import './globals.css'; // Import global CSS here

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Voice Chat with Gemini API</title>
        <meta name="description" content="Voice recognition with Gemini API" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="page-container">
          <header className="header">
            <h1>Voice Chat with Gemini</h1>
          </header>
          <main className="main-content">{children}</main>
          <footer className="footer">
            <p>&copy; 2025 Your Company</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
