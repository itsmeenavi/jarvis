// src/app/api/chat/route.ts

import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function POST(req: Request) {
  const { text } = await req.json();  // Assume `text` is coming from the front-end

  console.log("Received text:", text);  // Log the received text for debugging

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("API key is missing");
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              { 
                text: `Generate a thesis title for the input: ${text}.`  // Customize the text prompt as needed
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Gemini API response:", response.data);  // Log the response from Gemini API

    const title = response.data.candidates[0].content.parts[0].text;
    return NextResponse.json({ title });
  } catch (error: unknown) {
    // Narrowing down the error type to AxiosError
    if (axios.isAxiosError(error)) {
      console.error("Error in generating title:", error.response ? error.response.data : error.message);
      return NextResponse.json(
        { error: error.response ? error.response.data : 'Failed to generate title' },
        { status: 500 }
      );
    } else {
      // Fallback for other types of errors
      console.error("Unknown error:", error);
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }
}
