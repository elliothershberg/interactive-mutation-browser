import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAtomValue } from "jotai";

import AminoAcidEditor from "../components/AminoAcidEditor";
import { wildTypeSequenceAtom } from "../lib/sequenceState";

import { InfoPopover } from "../components/AminoAcidEditor";

const Editor: NextPage = () => {
  const router = useRouter();
  const wildTypeSequence = useAtomValue(wildTypeSequenceAtom);

  useEffect(() => {
    if (wildTypeSequence.length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {wildTypeSequence.length !== 0 && (
        <main>
          <div className="flex justify-between mt-4 mx-4">
            <Link href="/" className="text-xl text-gray-700">
              ← Back to form
            </Link>
            <div className="flex justify-start text-xl text-gray-700">
              Mutation Editor
              <InfoPopover />
            </div>

            <Link
              href="/browser"
              className="text-xl text-gray-700 place-self-end"
            >
              Predict structure →
            </Link>
          </div>
          <div className="flex w-full flex-1 flex-col items-center justify-center px-20 py-10 text-center">
            <AminoAcidEditor />
          </div>
        </main>
      )}
    </div>
  );
};

export default Editor;
