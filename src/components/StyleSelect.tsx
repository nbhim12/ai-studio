export default function StyleSelect() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="style" className="font-medium text-gray-700">
        Style
      </label>
      <select
        id="style"
        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="editorial">Editorial</option>
        <option value="streetwear">Streetwear</option>
        <option value="vintage">Vintage</option>
      </select>
    </div>
  );
}