import React from 'react'
const Select: React.FC<{
    options: string[]
    selectedValue?: string
    selectOption: (option: string) => void
    disabled?: boolean
    label?: string
}> = ({ options, selectedValue, selectOption, disabled, label }) => {
    return (
        <div style={{ width: '200px' }}>
            <label
                htmlFor="value"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <select
                onChange={(event) => {
                    selectOption(event.target.value)
                }}
                disabled={disabled}
                id="value"
                name="value"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={selectedValue || options[0]}
            >
                {options.map((o) => (
                    <option key={o}>{o}</option>
                ))}
            </select>
        </div>
    )
}

export default Select
