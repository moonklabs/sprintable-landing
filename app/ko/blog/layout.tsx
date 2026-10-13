import type { ReactNode } from "react";

/* 블로그는 어두운 바탕을 전제로 쓰였다(main #32~#35의 인라인 색상).
   랜딩 개편으로 body가 밝아졌으므로, 블로그 경로에만 기존 바탕을 그대로 씌워 보이는 모습을 유지한다. */
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(13% 0.015 265)", color: "oklch(93% 0.02 265)" }}
    >
      {children}
    </div>
  );
}
