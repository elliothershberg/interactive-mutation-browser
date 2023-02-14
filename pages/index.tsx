import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAtom } from "jotai";

import { inputSequence } from "../lib/sequenceState";

import InputForm from "../components/InputForm";

const Home: NextPage = () => {
  const [formInput, setFormInput] = useAtom(inputSequence);

  console.log(formInput);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900">
          Interactive Mutation Browser
        </h1>
        <p className="mt-3 text-2xl text-gray-700">
          Get started by entering an amino acid sequence.
        </p>
        <InputForm formInput={formInput} setFormInput={setFormInput} />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
