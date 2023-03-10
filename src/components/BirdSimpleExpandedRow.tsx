import React from 'react'
import { Bird, Edge } from '../types'
import { useQuery } from '@apollo/client'
import { BIRD_MEDIA } from '../queries/birdMediaQuery'
import NodeComponent from './Node'
import Loader from './Loader'
import Button from './Button'
import { Link } from 'react-router-dom'
import { birdPagePath } from '../constants/paths'

const BirdSimpleExpandedRow: React.FC<{
    isExpanded: boolean
    bird: Bird
}> = ({ isExpanded, bird }) => {
    const { data, loading } = useQuery(BIRD_MEDIA, {
        variables: {
            speciesId: bird.id,
            first: 6,
        },
        skip: !isExpanded,
    })

    if (!isExpanded) {
        return null
    }

    return (
        <tr>
            <td className="whitespace-nowrap p-0 px-3 text-sm" colSpan={3}>
                <div className="md:ml-4">
                    {!!data?.collectionCommunityMediaBySpeciesId?.edges
                        ?.length && (
                        <div>
                            <div className="flex flex-wrap">
                                {data.collectionCommunityMediaBySpeciesId.edges.map(
                                    (e: Edge) => (
                                        <NodeComponent
                                            node={e.node}
                                            key={e.node.id}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                    {loading && (
                        <div className="flex justify-center m-auto mb-16 mt-8">
                            <Loader />
                        </div>
                    )}
                    {!loading &&
                        data &&
                        !data?.collectionCommunityMediaBySpeciesId?.edges
                            ?.length && (
                            <div className="flex justify-center text-xl text-gray-600 m-auto my-8">
                                No pictures of
                                <b className="mx-1">
                                    {` ${bird.sentenceName} `}
                                </b>
                                yet
                            </div>
                        )}
                </div>
                <div className="text-center my-8">
                    <Link to={birdPagePath(bird)}>
                        <Button text="See more" />
                    </Link>
                </div>
            </td>
        </tr>
    )
}

export default BirdSimpleExpandedRow
