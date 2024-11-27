"use client"

import Button from "@/components/buttons/Button";

const EmptyMenuComponent = ({ onAdd }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md py-6 px-4 border bg-secondary-100 border-secondary-200 min-w-[900px] text-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-md font-regular text-primary-900">Menu jest puste</h2>
        <p className="text-sm font-normal text-gray-400">W tym menu nie ma jeszcze żadnych linków</p>
      </div>
      <Button onClick={onAdd} variant="primary">
        Dodaj pozycję menu
      </Button>
    </div>
  );
};

export default EmptyMenuComponent;

