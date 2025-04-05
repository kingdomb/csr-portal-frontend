// InputField.jsx

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  disabled = false,
}) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        required
        className={`w-full bg-slate-800 text-white border border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          disabled ? 'bg-slate-700 text-gray-400 cursor-not-allowed' : ''
        }`}
      />
    </div>
  );
}