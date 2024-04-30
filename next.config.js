/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/database',
        destination: 'http://localhost:5555/',
      },
      {
        source: '/http/databrowser.js',
        destination: 'http://localhost:5555/http/databrowser.js',
      },
      {
        source: '/assets/index.js',
        destination: 'http://localhost:5555/assets/index.js',
      },
      {
        source: '/assets/vendor.js',
        destination: 'http://localhost:5555/assets/vendor.js',
      },
      {
        source: '/index.css',
        destination: 'http://localhost:5555/index.css',
      },
      {
        source: '/api',
        destination: 'http://localhost:5555/api',
      },
    ]
  }
});