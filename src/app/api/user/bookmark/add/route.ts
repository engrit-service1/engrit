import { createClient } from "@/util/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const next = searchParams.get("next") ?? "/";
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const session = await supabase.auth.getUser();
    const user_email = session.data?.user?.email;

    const { t_youtube_id } = await request.json();
    if (!t_youtube_id) {
      throw new Error("id is required");
    }

    await supabase.from("bookmarks").insert([{ t_youtube_id, user_email }]);

    // if (error) {
    //   console.error("Supabase Error:", error);
    //   return NextResponse.json({ error: error.message }, { status: 500 });
    // }

    // return NextResponse.redirect(`${origin}${next}`);
    return NextResponse.json({ message: "Post created successfully" });
  } catch (error) {
    return NextResponse.json({ error: request }, { status: 500 });
  }
}
