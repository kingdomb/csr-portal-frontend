// ModalCard.jsx
import { FaTimes } from 'react-icons/fa';

import Card from './Card';

export default function ModalCard({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <div className="overflow-y-auto max-h-[65vh] pr-2">{children}</div>

        {footer && <div className="mt-6">{footer}</div>}
      </Card>
    </div>
  );
}