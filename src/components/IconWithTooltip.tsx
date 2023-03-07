import React from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const IconWithTooltip: React.FC<{
    icon: { name: string; iconUrl: string }
    className: string
    keyId: string
}> = ({ icon, className, keyId }) => (
    <span className="mx-2">
        <img
            data-tooltip-id={`tooltip-${keyId}`}
            data-tooltip-content={icon.name}
            className={className}
            src={icon.iconUrl}
            alt={icon.name}
        />
        <Tooltip id={`tooltip-${keyId}`} />
    </span>
)

export default IconWithTooltip
