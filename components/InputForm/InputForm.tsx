import Link from "next/link";

export default function InputForm({
  formInput,
  setFormInput,
}: {
  formInput: string;
  setFormInput: (inputSequence: string) => void;
}) {
  return (
    <div>
      <div className="grid-cols-1 mt-6">
        <textarea
          rows={8}
          cols={80}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formInput}
          onChange={(e) => setFormInput(e.target.value)}
        />
        <button
          type="button"
          className=" rounded-md border border-transparent bg-gray-600 px-6 py-3 mt-4 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Link href="/browser">Submit sequence</Link>
        </button>
      </div>
    </div>
  );
}
