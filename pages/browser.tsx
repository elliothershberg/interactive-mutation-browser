import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import AminoAcidSequence from "../components/AminoAcidSequence";
import StructureViewer from "../components/StructureViewer";

const Browser: NextPage = () => {
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
        <div className="flex flex-row">
          <div className="bg-gray-300 font-gray-900 font-bold rounded-md border-8 border-gray-300 m-6">
            Wild-type structure:
            <StructureViewer sequence="GPSALIVRKDEHWYCMN" />
          </div>

          <div className="bg-gray-300 font-gray-900 font-bold rounded-md border-8 border-gray-300 m-6">
            Mutated structure:
            <StructureViewer sequence="HETWTKCTDGASVLYNQPMRFIXBZ" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Browser;
