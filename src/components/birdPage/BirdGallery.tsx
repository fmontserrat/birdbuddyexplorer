import { MAX_PAGE_SIZE } from '../../constants/config'
import { Bird, Edge } from '../../types'
import NodeComponent from '../Node'
import React from 'react'

const BirdGallery: React.FC<{
    media: { edges: Edge[] }
    loading: boolean
    bird: Bird
}> = ({ media, loading, bird }) => (
    <div className="ml-4">
        {!!media?.edges?.length && (
            <div>
                <p className="text-xl text-gray-700">
                    The
                    <span className="font-medium">{' first '}</span>
                    <span className="font-medium">{MAX_PAGE_SIZE}</span>{' '}
                    pictures of {bird.sentenceName}
                </p>
                <div className="flex flex-wrap">
                    {media.edges.map((e: Edge) => (
                        <NodeComponent node={e.node} key={e.node.id} />
                    ))}
                </div>
            </div>
        )}
        {!loading && media && !media?.edges?.length && (
            <div className="flex justify-center text-xl text-gray-600 m-auto my-8">
                No pictures of
                <b className="mx-1">{` ${bird.sentenceName} `}</b>
                yet
            </div>
        )}
    </div>
)

export default BirdGallery
