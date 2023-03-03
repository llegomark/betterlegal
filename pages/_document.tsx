import Document, { Head, Html, Main, NextScript } from "next/document";
// Define constants for the site name, description, and image URL
const SITE_NAME = "AI-Powered Legal Guidance at Your Fingertips - Better Legal";
const DESCRIPTION =
  "Get reliable legal information and guidance related to Philippine law from our AI-powered platform. We provide general legal information on various areas of law, including Employment Law, Property Law, and more. Contact us today for assistance with your legal questions.";
const IMAGE_URL = "https://legal.llego.dev/betterlegal.png";
// Define a class component that extends the Document component from Next.js
class MyDocument extends Document {
  render() {
    // Return an HTML document with a head that includes meta tags and links, and a body that includes the main content and Next.js scripts
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:title" content={SITE_NAME} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={SITE_NAME} />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta property="og:image" content={IMAGE_URL} />
          <meta name="twitter:image" content={IMAGE_URL} />
        </Head>
        <body className="bg-[#f5f5f5]">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
// Export the MyDocument component as the default export of the module
export default MyDocument;
