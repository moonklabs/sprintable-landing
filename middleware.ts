import { NextResponse, type NextRequest } from "next/server";
import { isCrawler, isLocale, pickFromAcceptLanguage } from "./app/lib/locale";

/* 언어는 주소로 정해진다: / 는 영어, /ko 는 한국어. 검색엔진과 AI 크롤러가 두 언어를 각각 색인할 수 있다.
   사람이 / 로 처음 들어왔을 때만, 브라우저 언어(또는 직접 고른 언어)가 한국어면 /ko 로 보낸다. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isKorean = pathname === "/ko" || pathname.startsWith("/ko/");

  if (pathname === "/") {
    const chosen = request.cookies.get("locale")?.value; // 언어 전환 버튼으로 직접 고른 값
    const wantsKorean = isLocale(chosen)
      ? chosen === "ko"
      : !isCrawler(request.headers.get("user-agent")) &&
        pickFromAcceptLanguage(request.headers.get("accept-language") ?? "") === "ko";

    if (wantsKorean) {
      const target = request.nextUrl.clone();
      target.pathname = "/ko";
      const redirect = NextResponse.redirect(target, 307); // 일시 이동: 색인 주소는 계속 /
      redirect.headers.set("Vary", "Accept-Language, Cookie");
      redirect.headers.set("Cache-Control", "private, no-store");
      return redirect;
    }
  }

  const headers = new Headers(request.headers);
  headers.set("x-locale", isKorean ? "ko" : "en");
  const response = NextResponse.next({ request: { headers } });
  if (pathname === "/") response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  matcher: ["/", "/ko", "/ko/:path*"],
};
