import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { useAtomValue } from "jotai";

import { inputSequence } from "../lib/sequenceState";

import AminoAcidSequence from "../components/AminoAcidSequence";

const Browser: NextPage = () => {
  const sequence = useAtomValue(inputSequence);

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

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 py-10 text-center">
        <AminoAcidSequence sequence="GPSALIVRKDEHWYCMN" />
      </main>
    </div>
  );
};

export default Browser;
