/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Allow uploads up to 25 MB through Server Actions
      bodySizeLimit: "25mb"
    }
  },
  images: {
    // Restricted to own domain only — prevents SSRF via Next.js image optimization
    remotePatterns: []
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://donorbox.org https://*.donorbox.org https://js.stripe.com https://*.stripe.com https://jspm.dev https://*.jspm.dev https://cdn.jsdelivr.net https://www.paypal.com https://*.paypal.com https://www.paypalobjects.com",
              "style-src 'self' 'unsafe-inline' https://donorbox.org https://*.donorbox.org https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "font-src 'self' data: https://fonts.gstatic.com https://donorbox.org https://*.donorbox.org https://cdn.jsdelivr.net",
              "img-src 'self' data: blob: https://donorbox.org https://*.donorbox.org https://images.donorbox.org https://*.stripe.com https://*.paypal.com https://*.paypalobjects.com",
              "connect-src 'self' https://donorbox.org https://*.donorbox.org https://api.stripe.com https://*.stripe.com https://jspm.dev https://*.jspm.dev https://cdn.jsdelivr.net https://*.paypal.com",
              "frame-src 'self' https://donorbox.org https://*.donorbox.org https://js.stripe.com https://hooks.stripe.com https://*.stripe.com https://www.paypal.com https://*.paypal.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self' https://donorbox.org https://*.donorbox.org https://www.paypal.com https://*.paypal.com"
            ].join("; ")
          }
        ]
      }
    ];
  }
};

export default nextConfig;
