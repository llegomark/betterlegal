import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import type { LawAreaType } from "../components/DropDown";
import { DropDown } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Balancer from "react-wrap-balancer";
import React from "react";
import SocialIcon from "../components/SocialIcon";

// This interface defines the types of data that the API response should have
// The 'status' field indicates the HTTP status code of the response
// The 'body' field is a string that contains the response body
// The 'headers' field contains various headers from the response
// The 'error' field is an optional string that contains an error message, in case the API call fails
interface ResponseType {
  status: number;
  body: string;
  headers: {
    "X-Ratelimit-Limit": string;
    "X-Ratelimit-Remaining": string;
    "X-Ratelimit-Reset": string;
  };
}

// This extends the ResponseType interface to include an optional error message
interface ApiResponse extends ResponseType {
  error?: string;
}

// This defines the Home component, which is a functional component with no props
const Home: NextPage = () => {
  // These states store the component's data and whether it is currently loading
  const [, setResponse] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [lawArea, setLawArea] = useState<LawAreaType>("Employment Law");
  const [generatedTopics, setGeneratedTopics] = useState<string>("");
  const legalguidanceRef = useRef<null | HTMLDivElement>(null);

  const scrollToLegalGuidance = () => {
    if (legalguidanceRef.current !== null) {
      legalguidanceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `I have a legal question regarding "${topic}" in the context of Philippines law. Specifically, I am seeking general legal information, advice and guidance related to ${lawArea} that may be relevant to my situation. I understand that you are not a licensed attorney and that your response is not legal advice, but I am seeking reliable resources or guidance on my legal issue. Can you also suggest steps I can take to find a licensed attorney who can provide me with legal advice in the Philippines?`;

  // This function is called when the user submits the form
  // It calls the 'generateTopic' function to send a POST request to the API and update the 'generatedTopics' state
  // If there is an error with the API call, it shows an alert to the user
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    generateTopic().catch((error) => {
      // Handle errors here
      console.error(error);
      alert("An error occurred. Please try again.");
    });
  };
  // This function sends a POST request to the API with the provided prompt
  // It reads the response body as a stream and updates the 'generatedTopics' state with each chunk of data
  // If there is an error with the API call, it sets the 'response' state and shows an alert to the user
  const generateTopic = async (): Promise<void> => {
    setGeneratedTopics(""); // Clear any previous generated topics
    setLoading(true); // Set the loading state to true

    // Send a POST request to the API route with the prompt in the request body
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    // Handle errors when the response status is outside the 200-299 range
    if (response.status < 200 || response.status >= 300) {
      // Construct an error object with details about the response
      const error: ApiResponse = {
        status: response.status,
        body: await response.text(),
        headers: {
          "X-Ratelimit-Limit": response.headers.get(
            "X-Ratelimit-Limit"
          ) as string,
          "X-Ratelimit-Remaining": response.headers.get(
            "X-Ratelimit-Remaining"
          ) as string,
          "X-Ratelimit-Reset": response.headers.get(
            "X-Ratelimit-Reset"
          ) as string,
        },
        error: `Request failed with status code ${response.status}`,
      };

      // Set the response state to the error and show an alert to the user
      setResponse(error);
      setLoading(false);
      alert(
        `You have no API requests remaining today. Try again after 24 hours.`
      );
      return;
    }

    // Read the response body as a stream and update the generated topics state with each chunk of data
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedTopics((prev) => prev + chunkValue);
    }
    scrollToLegalGuidance(); // Scroll to the legal guidance section
    setLoading(false); // Set the loading state to false once the response is fully received
  };

  // This function limits the number of characters in a text area input
  const limitCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const maxCharacters = 600; // Set the maximum number of characters allowed
    const currentCharacters = e.target.value.length; // Get the current number of characters

    // Check if the current number of characters exceeds the maximum
    if (currentCharacters > maxCharacters) {
      // If it does, truncate the input value to the maximum number of characters
      e.target.value = e.target.value.slice(0, maxCharacters);
      // Show an error message to the user using a toast notification
      toast.error("You have reached the maximum number of characters.");
    }
  };

  // This variable is an array of strings that represents the generated topics
  // It is created by splitting the 'generatedTopics' state by the newline character
  const lines: string[] = generatedTopics.split("\n");

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-2">
      <Head>
        <title>
          AI-Powered Legal Guidance at Your Fingertips - Better Legal
        </title>
      </Head>

      <Header href="/" />
      <main className="sm:mt-15 mt-12 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <a
          className="mb-10 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-md transition-colors hover:bg-gray-100"
          href="/github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Mark Anthony Llego's Github profile"
          aria-describedby="github-link"
        >
          <SocialIcon platform="github" size={25} />
          <p>Star on Github</p>
        </a>
        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-slate-900 sm:text-6xl md:text-7xl">
          <Balancer>AI-Powered Legal Guidance at Your Fingertips</Balancer>
        </h2>
        <p
          className="mx-auto mt-6 max-w-xl text-base leading-normal text-slate-900 sm:mt-12 sm:text-lg lg:text-lg"
          aria-label="Lesson Planning"
        >
          <Balancer>
            Access reliable legal guidance for your situation in the Philippines
            with our AI-powered system. Our platform offers automated legal
            information, not legal advice, to help you make informed decisions
            about your legal issues. Get the answers you need anytime and
            anywhere with our easy-to-use platform. Experience the power of AI
            for your legal needs today.
          </Balancer>
        </p>
        <div className="w-full max-w-xl px-6">
          <div className="align-items-center mt-10 flex items-center">
            <span className="leading-zero flex h-6 w-6 items-center justify-center rounded-full bg-black p-2 text-center text-white">
              1
            </span>
            <p className="ml-3 text-left text-base leading-normal text-slate-900 sm:text-lg lg:text-lg">
              <Balancer>Please describe your legal problem.</Balancer>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onInput={limitCharacters}
              rows={4}
              className="focus:shadow-outline mt-5 w-full rounded-lg shadow-sm focus:outline-none"
              placeholder={
                "I recently started a new job and signed an employment contract with my employer. However, I am now having issues with my employer not providing me with the salary and benefits that were promised in the contract. I have tried to discuss the issue with my employer, but they have been unresponsive. What are my legal rights as an employee in the Philippines, and what steps can I take to resolve this issue?"
              }
              aria-label="Please input your desired topic or subject. If you leave the field blank, a random lesson will be generated."
            />
            <p className="mt-2 text-right text-sm text-gray-500">
              {topic.length}/600
            </p>
            <div className="align-items-center mt-10 flex items-center">
              <span className="leading-zero flex h-6 w-6 items-center justify-center rounded-full bg-black p-2 text-center text-white">
                2
              </span>
              <p className="ml-3 text-left text-base leading-normal text-slate-900 sm:text-lg lg:text-lg">
                <Balancer>
                  Select the general area of law that your legal problem falls
                  under.
                </Balancer>
              </p>
            </div>
            <div className="mt-3 block">
              <DropDown
                lawArea={lawArea}
                setLawArea={(newLawArea) => setLawArea(newLawArea)}
              />
            </div>
            {!loading && (
              <button
                className="mt-10 w-full rounded-lg bg-black px-4 py-2 text-base font-bold text-white transition-colors hover:bg-black/80"
                type="submit"
              >
                Get Informed &rarr;
              </button>
            )}
            {loading && (
              <button
                className="mt-10 w-full rounded-lg bg-black px-4 py-2 text-base text-white"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
          </form>
        </div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="my-10 space-y-10">
              {generatedTopics && (
                <>
                  <div>
                    <h2 className="mx-auto max-w-4xl px-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
                      <Balancer>Here&apos;s What You Need to Know</Balancer>
                    </h2>
                  </div>
                  <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8 px-3">
                    <div
                      className="relative transform cursor-pointer rounded-xl border bg-sky-200 p-4 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-sky-100 hover:shadow-lg"
                      onClick={() => {
                        const plan = `\nBy: Better Legal \n\n${generatedTopics}`;
                        navigator.clipboard
                          .writeText(plan)
                          .then(() => {
                            toast.success("Copied to Clipboard", {});
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                      }}
                    >
                      <p className="text-start text-base leading-normal text-slate-900 sm:text-lg lg:text-lg"
                      ref={legalguidanceRef}
                      >
                        {lines.map((line, index) => (
                          <React.Fragment key={index}>
                            {index === 0 ? (
                              <span className="font-bold">{line}</span>
                            ) : (
                              line
                            )}
                            <br />
                          </React.Fragment>
                        ))}
                        <br />
                        <span className="font-bold">Hint: </span>
                        <span>
                          To copy the generated legal guidance to your
                          clipboard, simply click on the guidance text and it
                          will be automatically copied. You can then paste the
                          guidance into a document or text editor for future
                          reference.
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 rounded-lg bg-yellow-200 p-4 text-start text-base text-slate-900 sm:text-lg lg:text-lg">
                      <h2 className="mb-2 font-bold">Usage Guidelines:</h2>
                      <p className="mb-4">
                        The legal guidance generated by our AI system is for
                        informational purposes only and should not be considered
                        as a substitute for professional legal advice.
                      </p>
                      <p className="mb-4">
                        Our website does not establish an attorney-client
                        relationship with any user. Therefore, the information
                        provided should not be construed as legal advice, nor
                        should it be relied upon as such.
                      </p>
                      <p className="mb-4">
                        We make no guarantees or warranties, expressed or
                        implied, about the accuracy, completeness, timeliness,
                        reliability, suitability, or availability with respect
                        to the information provided by our AI system.
                      </p>
                      <p className="mb-4">
                        We do not take responsibility for any decision made by a
                        user based on the legal guidance generated by our AI
                        system.
                      </p>
                      <p className="mb-4">
                        The use of our website and its services does not create
                        an attorney-client relationship between the user and any
                        attorney or law firm.
                      </p>
                      <p className="mb-4">
                        We reserve the right to remove any content or user that
                        violates our terms of service, including but not limited
                        to offensive, defamatory, or misleading content.
                      </p>
                      <p className="mb-4">
                        Our website and all of its content are protected by
                        copyright and other intellectual property laws. Users
                        may not reproduce, copy, or redistribute any of our
                        content without our written permission.
                      </p>
                      <p className="mb-4">
                        By using our website and its services, you agree to
                        these usage guidelines and our terms of service. If you
                        do not agree to these terms, you should not use our
                        website.
                      </p>
                      <h2 className="mb-2 font-bold">Disclaimer:</h2>
                      <p>
                        Our website provides general legal information and
                        guidance for informational purposes only. We are not a
                        law firm and we do not provide legal advice or services.
                        Our AI-powered platform offers automated legal
                        information based on the data entered into the system.
                        The information provided by our platform should not be
                        used as a substitute for professional legal advice. The
                        use of our platform does not create an attorney-client
                        relationship between you and us. If you have a specific
                        legal problem or concern, we encourage you to seek the
                        advice of a licensed attorney who is authorized to
                        practice law in the relevant jurisdiction. We make no
                        warranties, expressed or implied, about the accuracy,
                        completeness, timeliness, reliability, suitability, or
                        availability with respect to the information, products,
                        services, or related graphics contained on our website
                        for any purpose. Any reliance you place on such
                        information is therefore strictly at your own risk. In
                        no event will we be liable for any loss or damage
                        including without limitation, indirect or consequential
                        loss or damage, or any loss or damage whatsoever arising
                        from loss of data or profits arising out of or in
                        connection with the use of our website.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
