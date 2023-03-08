import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BirdProfile from '../components/BirdProfile'
import { useQuery } from '@apollo/client'
import { BIRD_MEDIA } from '../queries/birdMediaQuery'
import { MAX_PAGE_SIZE } from '../constants/config'
import { GET_BIRD_BY_ID } from '../queries/getBirdById'
import Papa, { ParseResult } from 'papaparse'
import { Badge, VisitRecord } from '../types'
import uniqWith from 'lodash.uniqwith'
import { cleanKey } from '../utils/keyCleaner'
import IconWithTooltip from '../components/IconWithTooltip'
import SelectMonth from '../components/SelectMonth'

const MONTHS = [
    { month: 'january', year: 2023 },
    { month: 'december', year: 2022 },
    { month: 'november', year: 2022 },
    { month: 'october', year: 2022 },
]

const BirdPage: React.FC = () => {
    const { id } = useParams()
    const [month, setMonth] = useState<string>(MONTHS[0].month)
    const [year, setYear] = useState<number>(MONTHS[0].year)
    const [uniqueLocations, setUniqueLocations] = useState<VisitRecord[]>([])
    const [records, setRecords] = useState<VisitRecord[]>([])
    const [historyLoading, setHistoryLoading] = useState(false)

    const { data: birdData, loading: birdLoading } = useQuery(GET_BIRD_BY_ID, {
        variables: {
            speciesId: id,
        },
        skip: !id,
    })

    const { data: mediaData, loading: mediaLoading } = useQuery(BIRD_MEDIA, {
        variables: {
            speciesId: id,
            first: MAX_PAGE_SIZE,
        },
        skip: !id,
    })

    useEffect(() => {
        if (birdData?.species.name) {
            setHistoryLoading(true)
            Papa.parse(
                `/data/${year}/${month}/${encodeURIComponent(
                    birdData.species.name
                )}.csv`,
                {
                    download: true,
                    header: true,
                    complete: (results: ParseResult<VisitRecord>) => {
                        const cleanRecords = results.data.filter(
                            (r) =>
                                r.anonymized_latitude !== '' &&
                                r.anonymized_longitude !== '' &&
                                r.anonymized_latitude !== undefined &&
                                r.anonymized_longitude !== undefined
                        )
                        setRecords(cleanRecords)
                        setUniqueLocations(
                            uniqWith(
                                cleanRecords,
                                (a, b) =>
                                    a.anonymized_latitude ===
                                        b.anonymized_latitude &&
                                    a.anonymized_longitude ===
                                        b.anonymized_longitude
                            )
                        )
                        setHistoryLoading(false)
                    },
                }
            )
        }
    }, [birdData?.species.name, month])

    const bird = birdData?.species
    return (
        <div className="m-8 px-4 py-8 sm:px-6 md:px-8 m-auto w-full">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="flex items-center text-4xl font-semibold text-gray-900">
                        {bird?.iconUrl && (
                            <img
                                className="align-middle h-24 ml-8 mr-0"
                                src={bird.iconUrl}
                                alt="Bird Buddy Explorer"
                            />
                        )}
                        <span>{bird?.name}</span>
                        <div className="flex mx-2">
                            {bird?.badges.map((badge: Badge) => {
                                const key = `${bird.id}-${cleanKey(badge.name)}`

                                return (
                                    <IconWithTooltip
                                        key={key}
                                        keyId={key}
                                        icon={badge}
                                        className="h-12 w-12"
                                    />
                                )
                            })}
                        </div>
                    </h1>
                </div>
            </div>
            <div className="mt-8">
                <div className="p-8">
                    <SelectMonth
                        disabled={mediaLoading || birdLoading}
                        options={MONTHS}
                        selectOption={(option) => {
                            setMonth(option.month)
                            setYear(option.year)
                        }}
                        selectedValue={MONTHS.find(
                            (m) => m.month === month && m.year === year
                        )}
                    />
                </div>
                <BirdProfile
                    loading={mediaLoading || birdLoading || historyLoading}
                    media={mediaData?.collectionCommunityMediaBySpeciesId}
                    bird={birdData?.species}
                    month={month}
                    year={year}
                    records={records}
                    uniqueLocations={uniqueLocations}
                />
            </div>
        </div>
    )
}

export default BirdPage
