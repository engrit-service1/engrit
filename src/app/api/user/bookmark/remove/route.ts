import { createClient } from "@/util/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  // return NextResponse.json({ message: "Hello from Next.js!" });
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const session = await supabase.auth.getUser();
    const user_email = session.data?.user?.email;

    const { t_youtube_id } = await request.json();
    if (!t_youtube_id) {
      throw new Error("id is required");
    }

    const { data, error } = await supabase
      // await supabase
      .from("bookmarks")
      .delete()
      .match({ t_youtube_id, user_email });

    // if (error) {
    //   throw error;
    // }

    return NextResponse.json({ data }, { status: 200 });
    // return NextResponse.json({ message: "Post created successfully" });
  } catch (error) {}
}
