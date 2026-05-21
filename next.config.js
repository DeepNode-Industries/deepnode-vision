/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Capacitor
  output: 'export',
  trailingSlash: true,

  images: {
    // Required for static export (no image optimization server)
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
