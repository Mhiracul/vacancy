// Components/FineSelect.jsx
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

const FineSelect = ({ label, options = [], value, onChange, placeholder }) => {
  // Normalize options so both string and object forms work
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  // Find the currently selected option label
  const selectedOption =
    normalizedOptions.find((opt) => opt.value === value) || {};

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-gray-700 mb-1">{label}</label>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 text-left text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span
              className={`block truncate ${
                !selectedOption.value ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {selectedOption.label || placeholder || "Select..."}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 w-full bg-white outline-none shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto z-10">
              {normalizedOptions.length > 0 ? (
                normalizedOptions.map((option, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `cursor-pointer select-none py-2 pl-4 pr-8 ${
                        active ? "bg-blue-100 text-blue-700" : "text-gray-700"
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 right-2 flex items-center text-blue-600">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-400 text-sm">
                  No options available
                </div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default FineSelect;
