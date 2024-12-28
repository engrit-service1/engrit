import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get("videoId");

  // YoutubeTranscript.fetchTranscript(`${videoId}`).then(() => {
  //   console.log("번역");
  // });

  const transcript = await YoutubeTranscript.fetchTranscript(
    `https://www.youtube.com/watch?v=${videoId}`
  );
  
  // const cleanData = JSON.parse(JSON.stringify(response.data));
  return NextResponse.json({
    transcript,
  });
}
export const runtime = "edge";