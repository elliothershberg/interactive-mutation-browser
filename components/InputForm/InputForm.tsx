export default function InputForm({
  inputSequence,
  setInputSequence,
}: {
  inputSequence: string;
  setInputSequence: (inputSequence: string) => void;
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
          value={inputSequence}
          onChange={(e) => setInputSequence(e.target.value)}
        />
      </div>
    </div>
  );
}
