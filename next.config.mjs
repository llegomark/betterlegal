/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/llegomark/betterlegal/",
        permanent: false,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/markllego/",
        permanent: false,
      },
    ];
  },
};
export default config;
