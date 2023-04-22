import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";
import { useAtomValue } from "jotai";

import {
  wildTypeSequenceAtom,
  mutatedSequenceAtom,
  mutatedResiduesAtom,
} from "../lib/sequenceState";
import dynamic from "next/dynamic";

const StructureViewer = dynamic(() => import("../components/StructureViewer"), {
  ssr: false,
});

const Browser: NextPage = () => {
  const router = useRouter();
  const wildTypeSequence = useAtomValue(wildTypeSequenceAtom);
  const mutatedSequence = useAtomValue(mutatedSequenceAtom);
  const mutatedResidues = useAtomValue(mutatedResiduesAtom);

  useEffect(() => {
    if (wildTypeSequence.length === 0) {
      router.push("/");
    }
  }, []);

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
          <div className="w-full flex flex-col sm:flex-row justify-center">
            <div className="bg-gray-300 font-gray-900 font-bold rounded-md border-8 border-gray-300 m-6 w-full sm:w-auto">
              <div className="mb-2">Wild-type structure</div>
              <Suspense>
                <StructureViewer
                  sequence={wildTypeSequence}
                  elementId={"wildTypeViewer"}
                />
              </Suspense>
            </div>

            <div className="bg-gray-300 font-gray-900 font-bold rounded-md border-8 border-gray-300 m-6 w-full sm:w-auto">
              <div className="mb-2">Mutated structure</div>
              <Suspense>
                <StructureViewer
                  sequence={mutatedSequence}
                  elementId={"mutationViewer"}
                  mutatedResidues={mutatedResidues}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Browser;
