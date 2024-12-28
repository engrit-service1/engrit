import { createClient } from "@/util/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    // const { searchParams, origin } = new URL(request.url);
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { id } = await request.json();
    if (!id) {
      throw new Error("id is required");
    }
    const { data, error } = await supabase
      .from("youtube")
      .delete()
      .eq("id", id);
    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {}
}
