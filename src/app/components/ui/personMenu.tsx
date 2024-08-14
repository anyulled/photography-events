import { CheckIcon } from "@heroicons/react/20/solid";
import React from "react";

export function PersonMenu() {
  return (
    <div className="mt-5 flex lg:ml-4 lg:mt-0">
      <span className="sm:ml-3">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
          Publish Availability
        </button>
      </span>
    </div>
  );
}
