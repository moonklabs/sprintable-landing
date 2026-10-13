import { HomePage } from "../components/home-page";
import { buildHomeMetadata } from "../lib/seo";

/* 한국어 홈 — 영어는 / */
export async function generateMetadata() {
  return buildHomeMetadata("ko");
}

export default function Page() {
  return <HomePage />;
}
