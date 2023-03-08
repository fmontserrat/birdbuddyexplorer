import React from 'react'

const Button: React.FC<{ text: string }> = ({ text }) => (
    <button
        type="button"
        className="rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
        {text}
    </button>
)

export default Button
