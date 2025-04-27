// src/app/page.tsx
"use client"; // Keep this if components inside use client features

import VoiceRecognition from './components/VoiceRecognition'; // Import the component

// Define the Page component for this route
export default function Home() {
  return (
    <VoiceRecognition /> // Render the imported component
  );
}
