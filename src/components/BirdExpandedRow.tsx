import { cleanKey } from '../utils/keyCleaner'
import { MusicalNoteIcon } from '@heroicons/react/20/solid'
import { Bird, Edge } from '../types'
import NodeComponent from './Node'
import Loader from './Loader'
import React from 'react'
import { MAX_PAGE_SIZE } from '../constants/config'

const BirdExpandedRow: React.FC<{
    loading: boolean
    bird?: Bird
    data: { collectionCommunityMediaBySpeciesId: { edges: Edge[] } }
}> = ({ bird, data, loading }) => {
    if (!bird) {
        // TODO fetch bird
        return null
    }

    return (
        <tr>
            <td
                className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0"
                colSpan={3}
            >
                <div className="flex ml-4 justify-evenly">
                    <div>
                        <p className="text-l text-gray-700 mb-2">
                            Where to find a {bird.sentenceName}
                        </p>
                        <img src={bird.mapUrl} />
                    </div>
                    {!!bird.sounds.filter((s) => !!s.url || s.sourceUrl)
                        .length && (
                        <div className="ml-2">
                            <p className="text-l text-gray-700">
                                Hear the songs of a {bird.sentenceName}
                            </p>
                            <div className="flex mt-4 mb-8 flex-col">
                                {bird.sounds.map((sound) => {
                                    if (!sound.sourceUrl && !sound.url) {
                                        return null
                                    }
                                    const key = `${bird.id}-${cleanKey(
                                        sound.url || sound.sourceUrl
                                    )}`

                                    return (
                                        <div key={key} className="flex my-2">
                                            <audio controls>
                                                <source
                                                    src={sound.url}
                                                    type="audio/mpeg"
                                                />
                                                <a href={sound.url}>
                                                    <MusicalNoteIcon
                                                        className="h-5 w-5 text-red-400 mx-2"
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            </audio>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div className="ml-4">
                    {!!data?.collectionCommunityMediaBySpeciesId?.edges
                        ?.length && (
                        <div>
                            <p className="text-l text-gray-700">
                                Showing the
                                <span className="font-medium">{' first '}</span>
                                <span className="font-medium">
                                    {MAX_PAGE_SIZE}
                                </span>{' '}
                                pictures of {bird.sentenceName}
                            </p>
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
            </td>
        </tr>
    )
}
export default BirdExpandedRow
