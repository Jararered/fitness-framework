import { useState, useEffect } from "react";

import "./SelectorSearchable.css";

interface SelectorSearchableProps<T> {
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  getOptionLabel: (option: T) => string;
  placeholder?: string;
  className?: string;
}

export function SelectorSearchable<T>({
  options,
  value,
  onChange,
  getOptionLabel,
  placeholder = "Type to search...",
  className = "",
}: SelectorSearchableProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);

  useEffect(() => {
    const filtered = options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options, getOptionLabel]);

  useEffect(() => {
    // Handle clicking outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".selector-searchable")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (option: T) => {
    onChange(option);
    setSearchTerm(getOptionLabel(option));
    setIsOpen(false);
  };

  return (
    <div className={`selector-searchable ${className}`}>
      <input
        className="selector-search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={value ? getOptionLabel(value) : placeholder}
      />

      {isOpen && (
        <div className="selector-dropdown">
          <div className="options-container">
            {filteredOptions.length === 0 ? (
              <div className="no-results">No results found</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="option-item"
                  onClick={() => handleSelect(option)}
                >
                  {getOptionLabel(option)}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
