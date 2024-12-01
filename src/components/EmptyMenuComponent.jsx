"use client";

import Button from "@/components/buttons/Button";
import Image from "next/image";

const EmptyMenuComponent = ({ onAdd }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full rounded-md py-6 px-4 border bg-secondary-100 border-secondary-200 text-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-md font-regular text-primary-900">
          Menu jest puste
        </h2>
        <p className="text-sm font-normal text-gray-400">
          W tym menu nie ma jeszcze żadnych linków
        </p>
      </div>
      <Button
        className="flex items-center gap-2"
        onClick={onAdd}
        variant="primary"
      >
        <Image src="/plus-circle.svg" alt="Add" width={16} height={16} />
        Dodaj pozycję menu
      </Button>
    </div>
  );
};

export default EmptyMenuComponent;
