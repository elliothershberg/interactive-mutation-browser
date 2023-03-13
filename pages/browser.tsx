import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";

import AminoAcidSequence from "../components/AminoAcidSequence";
import StructureViewer from "../components/StructureViewer";
import {
  sequenceArrayAtom,
  wildTypeSequenceAtom,
  mutatedSequenceAtom,
} from "../lib/sequenceState";
import { useEffect } from "react";

const Browser: NextPage = () => {
  const router = useRouter();
  const sequenceArray = useAtomValue(sequenceArrayAtom);
  const wildTypeSequence = useAtomValue(wildTypeSequenceAtom);
  const mutatedSequence = useAtomValue(mutatedSequenceAtom);

  useEffect(() => {
    if (sequenceArray.length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sequenceArray.length !== 0 && (
        <main>
          <div className="mt-4 ml-4">
            <Link href="/" className="text-xl text-gray-700">
              ← Back to form
            </Link>
          </div>
          <div className="flex w-full flex-1 flex-col items-center justify-center px-20 py-10 text-center">
            <AminoAcidSequence />
            <div className="flex flex-row">
              <div className="bg-gray-300 font-gray-900 font-bold rounded-md border-8 border-gray-300 m-6">
                Wild-type structure:
                <StructureViewer sequence={wildTypeSequence} />
              </div>

              <div className="bg-gray-300 font-gray-900 font-bold rounded-md border-8 border-gray-300 m-6">
                Mutated structure:
                <StructureViewer sequence={mutatedSequence} />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Browser;
