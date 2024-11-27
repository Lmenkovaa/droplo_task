"use client";

import Image from "next/image";

const Item = ({ label, url, onAdd, onEdit, onDelete, level, children }) => {
  return (
    <div className="flex flex-shrink flex-col w-full">
      <div className="flex items-center justify-between bg-white border-b border-secondary-200 py-4 px-5">
        <div className="flex items-center gap-4">
          <Image src="/move.svg" alt="Move" width={24} height={24} />
          <div>
            <h2 className="text-sm font-semibold text-primary-900">{label}</h2>
            <p className="text-sm text-secondary-400">{url}</p>
          </div>
        </div>

        <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden min-h-10">
          <button
            className="text-sm font-semibold text-secondary-700 py-2.5 px-3.5 border-r border-gray-300"
            onClick={onDelete}
          >
            Usuń
          </button>
          <button
            className="text-sm font-semibold text-secondary-700 py-2.5 px-3.5"
            onClick={onEdit}
          >
            Edytuj
          </button>
          <button
            className="text-sm font-semibold text-secondary-700 py-2.5 px-3.5 border-l border-gray-300"
            onClick={onAdd}
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>

      <div className={`flex flex-wrap ml-${level * 8}`}>{children}</div>
    </div>
  );
};

export default Item;
