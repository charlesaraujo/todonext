function envURL() {
  const envVariable =
    process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

  return envVariable ? `https://${envVariable}` : `http://localhost:3000`;
}
export const server = envURL();
