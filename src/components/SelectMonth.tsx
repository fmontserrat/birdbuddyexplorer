import React from 'react'
import { capitalizeFirstLetter } from '../utils/stringUtils'

interface Option {
    month: string
    year: number
}

const SelectMonth: React.FC<{
    options: Option[]
    selectedValue?: Option
    selectOption: (option: Option) => void
    disabled: boolean
}> = ({ options, selectedValue, selectOption, disabled }) => {
    const formatValue = (option: Option) =>
        `${capitalizeFirstLetter(option.month)} ${option.year}`

    return (
        <div style={{ width: '200px' }}>
            <label
                htmlFor="month"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Available Monthly Data
            </label>
            <select
                onChange={(event) => {
                    const data = event.target.value.split(' ')
                    selectOption({
                        month: data[0].toLowerCase(),
                        year: Number(data[1]),
                    })
                }}
                disabled={disabled}
                id="month"
                name="month"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={formatValue(selectedValue || options[0])}
            >
                {options.map((o) => (
                    <option key={`option-${o.month}-${o.year}`}>
                        {formatValue(o)}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectMonth
