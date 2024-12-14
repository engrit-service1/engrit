import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/util/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const session = await supabase.auth.getUser();
  const uploader = session.data?.user?.email;

  try {
    const { data, error } = await supabase
      .from("youtube")
      .select("*")
      .eq("uploader", uploader);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}