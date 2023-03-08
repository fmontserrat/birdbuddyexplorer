import { Node } from '../types'
import React from 'react'
import { Tooltip } from 'react-tooltip'

const NodeComponent: React.FC<{ node: Node }> = ({ node }) => (
    <div className="py-4 md:p-8 flex-1 grow basis-11/12 md:basis-1/2 lg:basis-1/3 xl:basis-1/6">
        <img
            data-tooltip-id={node.id}
            data-tooltip-content={`${node.feederName} in ${
                node.locationCity
            }, ${node.locationCountry} on ${new Date(
                node.media.createdAt
            ).toLocaleString()}`}
            src={node.media.thumbnailUrl}
            className="inset-0 h-full w-full object-cover object-center rounded opacity-90 hover:opacity-100"
        />
        <Tooltip id={node.id} />
    </div>
)
export default NodeComponent
