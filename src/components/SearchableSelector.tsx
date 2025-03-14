import { useState, useEffect } from 'react';
import '../styles/components/SearchableSelector.css';

interface SearchableSelectorProps<T> {
    options: T[];
    value: T | null;
    onChange: (value: T | null) => void;
    getOptionLabel: (option: T) => string;
    placeholder?: string;
    className?: string;
}

export function SearchableSelector<T>({
    options,
    value,
    onChange,
    getOptionLabel,
    placeholder = 'Select',
    className = '',
}: SearchableSelectorProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<T[]>(options);

    useEffect(() => {
        const filtered = options.filter((option) =>
            getOptionLabel(option)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [searchTerm, options, getOptionLabel]);

    const handleSelect = (option: T) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className={`searchable-selector ${className}`}>
            <div
                className="selector-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value ? getOptionLabel(value) : placeholder}
            </div>

            {isOpen && (
                <div className="selector-dropdown">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="selector-search"
                        placeholder="Type to search..."
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                    />

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
