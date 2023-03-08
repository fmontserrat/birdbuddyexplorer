import React from 'react'

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-xl text-gray-700 mb-2 md:mb-4">{children}</p>
)

export default Title
