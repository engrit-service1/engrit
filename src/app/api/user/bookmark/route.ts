import { createClient } from "@/util/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const session = await supabase.auth.getUser();
    const userEmail = session.data?.user?.email;

    if (!userEmail) {
      return new Response(JSON.stringify({ error: "User not logged in." }), {
        status: 401,
      });
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .select(
        `
        t_youtube_id,
        youtube (id, youtube_link, uploader, created_at, tag)
      `
      )
      .eq("user_email", userEmail);

    if (error) {
      throw error;
    }
    // res.status(200).json(data);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    // res.status(500).json({ error: error });
    return NextResponse.json({ error }, { status: 500 });
  }
}
