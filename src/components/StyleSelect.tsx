export type StyleOption = 'Editorial' | 'Streetwear' | 'Vintage';

interface StyleDropdownProps {
  value: StyleOption;
  onChange: (val: StyleOption) => void;
}

export default function StyleDropdown({ value, onChange }: StyleDropdownProps) {
  const styles: StyleOption[] = ['Editorial', 'Streetwear', 'Vintage'];

  return (
    <div className="space-y-2">
      <label htmlFor="style" className="block font-medium">
        Style
      </label>

      <select
        id="style"
        aria-label="Select visual style"
        value={value}
        onChange={(e) => onChange(e.target.value as StyleOption)}
        className="w-full p-2 border rounded-lg shadow-sm text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {styles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>

      <p className="text-xs text-gray-500">Try: Editorial, Streetwear, or Vintage.</p>
    </div>
  );
}