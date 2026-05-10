/** @type {import('next').NextConfig} */

// Security headers — boost trust signals + prevent common attacks
// Reference: https://securityheaders.com/
const securityHeaders = [
  // Prevents your site from being embedded in iframes on other domains (clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevents MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Controls how much info the browser sends with the Referer header
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disables browser features you don't use — reduces attack surface + privacy win
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // HSTS — force HTTPS for 2 years. Only enable after confirming HTTPS works everywhere.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // DNS prefetch control
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Trailing slash convention — pick one. false = /work (no trailing slash).
  // IMPORTANT: Consistency across links, sitemap, and canonical URLs is critical for SEO.
  trailingSlash: false,

  // Compress responses
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year — long caching is safe with content-hashed URLs
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256],
  },

  // Security headers applied to all routes
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  // Redirects — add old URLs here when you migrate from an older site.
  // Use permanent: true (308) for SEO — preserves link equity.
  async redirects() {
    return [
      // Example redirects — uncomment and customize when migrating
      // { source: '/portfolio', destination: '/work', permanent: true },
      // { source: '/blog-old', destination: '/blog', permanent: true },
      // { source: '/services/web-development', destination: '/services', permanent: true },
    ];
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
