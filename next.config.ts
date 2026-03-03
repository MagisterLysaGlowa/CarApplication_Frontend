/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "api.yourvehicle.pl",
      "localhost",
      "lh3.googleusercontent.com",
      "yourvehicle.pl",
    ], // Allow remote images from this domain
  },
  transpilePackages: ["react-quill"],
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/, // Matches .svg files
      use: [
        {
          loader: "@svgr/webpack", // Loader for transforming SVGs into React components
          options: {
            icon: true, // Optimize SVGs for use as icons
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
