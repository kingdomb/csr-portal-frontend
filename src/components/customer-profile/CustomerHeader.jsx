// CustomerHeader.jsx;
import { FaArrowLeft } from 'react-icons/fa';

export default function CustomerHeader({ onBack }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div />
      <button
        onClick={onBack}
        className="flex items-center text-sm text-blue-300 hover:text-blue-500"
      >
        <FaArrowLeft className="w-4 h-4 mr-1" />
        Back to Customers
      </button>
    </div>
  );
}