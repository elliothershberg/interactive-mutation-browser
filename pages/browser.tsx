import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useAtomValue } from "jotai";

import {
  wildTypeSequenceAtom,
  mutatedSequenceAtom,
} from "../lib/sequenceState";

import StructureViewer from "../components/StructureViewer";

const Editor: NextPage = () => {
  const wildTypeSequence = useAtomValue(wildTypeSequenceAtom);
  const mutatedSequence = useAtomValue(mutatedSequenceAtom);

  return (
    <div>
      <Head>
        <title>Browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mt-4 mx-4">
          <Link href="/editor" className="text-xl text-gray-700">
            ← Back to editor
          </Link>
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 py-10 text-center">
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
    </div>
  );
};

export default Editor;
