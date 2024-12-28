import { NextResponse } from "next/server";
import { createClient } from "@/util/supabase/client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient(); // 클라이언트 생성
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
``
      if (isLocalEnv) {
        // console.log('로컬환경');
        return NextResponse.redirect(`${origin}${next}`);
      } else {
        // console.log("배포환경");
        return NextResponse.redirect(`https://${forwardedHost ?? origin}`);
        // return NextResponse.redirect(`https://engrit-client.vercel.app`);
      }
    }
  }

  // 인증 실패 시 에러 페이지로 리다이렉트
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
