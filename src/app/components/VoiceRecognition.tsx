// src/app/components/VoiceRecognition.tsx

"use client";  // This ensures the component is rendered on the client side

import { useState } from "react";
import axios from "axios";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VoiceRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return (
      <div className="unsupported">
        <p>Speech Recognition is not supported in this browser.</p>
      </div>
    );
  }

  const startRecording = () => {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      handleGeminiAPI(spokenText);
    };

    recognition.onerror = (error: any) => {
      console.error("Speech recognition error:", error);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleGeminiAPI = async (text: string) => {
    try {
      const response = await axios.post("/api/chat", { text });
      if (response.data.reply) {
        setResponse(response.data.reply);
      } else {
        setResponse("No response received from Gemini API.");
      }
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      setResponse("There was an error processing your request.");
    }
  };

  return (
    <div className="voice-recognition-container">
      <button onClick={startRecording} disabled={isRecording} className="record-btn">
        {isRecording ? "Recording..." : "Start Voice Recognition"}
      </button>
      <div className="output">
        <p className="transcript">Transcript: {transcript}</p>
        <p className="response">Response: {response}</p>
      </div>
    </div>
  );
};

export default VoiceRecognition;  // Ensure the default export here
