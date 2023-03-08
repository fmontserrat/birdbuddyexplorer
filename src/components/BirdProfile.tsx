import { cleanKey } from '../utils/keyCleaner'
import { MusicalNoteIcon } from '@heroicons/react/20/solid'
import { Bird, Edge, VisitRecord } from '../types'
import NodeComponent from './Node'
import Loader from './Loader'
import React from 'react'
import { MAX_PAGE_SIZE } from '../constants/config'
import { capitalizeFirstLetter } from '../utils/stringUtils'
import VisitsMap from './VisitsMap'
import HourlyChart from './HourlyChart'
import DailyChart from './DailyChart'
import Title from './Title'

const BirdProfile: React.FC<{
    loading: boolean
    bird?: Bird
    media?: { edges: Edge[] }
    month: string
    year: number
    records: VisitRecord[]
    uniqueLocations: VisitRecord[]
}> = ({ bird, media, loading, month, year, uniqueLocations, records }) => {
    if (loading || !bird || !media) {
        return (
            <div className="flex justify-center m-auto mb-16 mt-8">
                <Loader />
            </div>
        )
    }

    const monthName = capitalizeFirstLetter(month)

    return (
        <div className="mx-8">
            <div className="ml-4">
                {!!records.length && (
                    <div className="pb-8">
                        <div className="lg:flex justify-evenly">
                            <div>
                                <Title>
                                    Distribution of visits of{' '}
                                    {bird.sentenceName} during {monthName}
                                </Title>
                                <DailyChart records={records || []} />
                            </div>

                            <div>
                                <Title>
                                    Distribution of visits of{' '}
                                    {bird.sentenceName} during the day
                                </Title>
                                <HourlyChart records={records || []} />
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <Title>
                        Locations of visits of {bird.sentenceName} in{' '}
                        {capitalizeFirstLetter(month)} {year}
                    </Title>
                    <VisitsMap records={uniqueLocations} />
                </div>
                {!!bird.sounds?.filter((s) => !!s.url || s.sourceUrl)
                    .length && (
                    <div className="mt-8">
                        <Title>Hear the songs of a {bird.sentenceName}</Title>
                        <div className="flex mt-4 mb-8 flex-row w-100 flex-wrap">
                            {bird.sounds.map((sound) => {
                                if (!sound.sourceUrl && !sound.url) {
                                    return null
                                }
                                const key = `${bird.id}-${cleanKey(
                                    sound.url || sound.sourceUrl
                                )}`

                                return (
                                    <div key={key} className="flex m-2">
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
                {!!media?.edges?.length && (
                    <div>
                        <p className="text-xl text-gray-700">
                            The
                            <span className="font-medium">{' first '}</span>
                            <span className="font-medium">
                                {MAX_PAGE_SIZE}
                            </span>{' '}
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
        </div>
    )
}
export default BirdProfile
