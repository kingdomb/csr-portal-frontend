// Card.jsx
export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-[#0F172A] text-white rounded-lg shadow-md border border-gray-700 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
