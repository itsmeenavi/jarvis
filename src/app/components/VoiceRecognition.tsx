// src/app/components/VoiceRecognition.tsx

"use client";  // This ensures the component is rendered on the client side

import { useState } from "react";
import axios from "axios";
import { FaMicrophone, FaStop } from 'react-icons/fa'; // Import icons

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
    <div className="voice-container"> {/* Changed class name for clarity */}
      <button
        onClick={startRecording}
        disabled={isRecording}
        className="record-button" // Use a more specific class
      >
        {isRecording ? (
          <><FaStop className="icon" /> Recording...</>
        ) : (
          <><FaMicrophone className="icon" /> Start Recording</>
        )}
      </button>
      {(transcript || response) && ( // Only show output area if there's something to show
        <div className="output-area"> {/* Changed class name */}
          {transcript && (
            <div className="transcript-section">
              <h3>Your Input:</h3>
              <p>{transcript}</p>
            </div>
          )}
          {response && (
             <div className="response-section">
               <h3>AI Response:</h3>
               <p>{response}</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceRecognition;  // Ensure the default export here
