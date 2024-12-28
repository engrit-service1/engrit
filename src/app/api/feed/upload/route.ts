import { createClient } from "@/util/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const next = searchParams.get("next") ?? "/";
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const session = await supabase.auth.getUser();
    const uploader = session.data?.user?.email;

    const { youtube_link, tag } = await request.json();
    if (!youtube_link) {
      throw new Error("youtube_link is required");
    }
    
    const { data, error } = await supabase
      .from("youtube")
      .insert([{ youtube_link, uploader, tag }]);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Post created successfully", data });
  } catch (error: any) {
    console.error("Server Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }
}
