export default function InputForm() {
  return (
    <div>
      <div className="mt-6">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={""}
        />
      </div>
    </div>
  );
}
