import React from 'react'
import classNames from 'classnames'

const Loader: React.FC<{ small?: boolean }> = ({ small }) => (
    <div
        className={classNames(
            'inline-block h-16 w-16 text-red-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]',
            { 'h-8 w-8': small }
        )}
        role="status"
    />
)

export default Loader
