import { HomePage } from "./components/home-page";
import { buildHomeMetadata } from "./lib/seo";

/* 영어 홈 — 한국어는 /ko */
export async function generateMetadata() {
  return buildHomeMetadata("en");
}

export default function Page() {
  return <HomePage />;
}
