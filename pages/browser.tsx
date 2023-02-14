import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useAtom } from "jotai";

import { inputSequence } from "../lib/sequenceState";

const Browser: NextPage = () => {
  const [sequence] = useAtom(inputSequence);

  return (
    <div>
      <Head>
        <title>Browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-4 ml-4">
        <Link href="/" className="text-xl text-gray-700">
          ← Back to form
        </Link>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1>{sequence}</h1>
        </main>
      </div>
    </div>
  );
};

export default Browser;
