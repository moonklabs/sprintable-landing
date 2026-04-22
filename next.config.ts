import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const APP_URL = "https://app.sprintable.ai";

const APP_PATHS = [
  "/agents",
  "/board",
  "/docs",
  "/inbox",
  "/meetings",
  "/memos",
  "/mockups",
  "/retro",
  "/rewards",
  "/settings",
  "/standup",
  "/dashboard",
  "/api",
  "/auth",
  "/pricing",
  "/invitations",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www → apex
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sprintable.ai" }],
        destination: "https://sprintable.ai/:path*",
        permanent: true,
      },
      // App routes → app.sprintable.ai
      ...APP_PATHS.flatMap((p) => [
        {
          source: p,
          destination: `${APP_URL}${p}`,
          permanent: true,
        },
        {
          source: `${p}/:path*`,
          destination: `${APP_URL}${p}/:path*`,
          permanent: true,
        },
      ]),
    ];
  },
};

export default withNextIntl(nextConfig);
