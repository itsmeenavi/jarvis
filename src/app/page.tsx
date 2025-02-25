// src/app/page.tsx

import Head from "next/head";
import VoiceRecognition from "./components/VoiceRecognition";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Voice Chat with Gemini API</title>
        <meta name="description" content="Voice recognition with Gemini API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Talk to Gemini!</h1>
        <VoiceRecognition />
      </main>
    </div>
  );
}
