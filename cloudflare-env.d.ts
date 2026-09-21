interface CloudflareEnv {
  DB: D1Database;
  ASSETS: Fetcher;
  WORKER_SELF_REFERENCE: Fetcher;
  NEXT_PUBLIC_APP_NAME: string;
}
