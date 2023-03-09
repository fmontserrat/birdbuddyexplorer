import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import Stats from '../components/Stats'
import BirdCharts from '../components/birdPage/BirdCharts'
import Title from '../components/Title'
import { capitalizeFirstLetter } from '../utils/stringUtils'
import VisitsMap from '../components/birdPage/VisitsMap'
import BirdSounds from '../components/birdPage/BirdSounds'
import BirdGallery from '../components/birdPage/BirdGallery'
import Select from '../components/Select'
import { reportPagePath } from '../constants/paths'
import { ALL_BIRDS_SORTED } from '../constants/allbirds'

const MONTHS = [
    { month: 'february', year: 2023 },
    { month: 'january', year: 2023 },
    { month: 'december', year: 2022 },
    { month: 'november', year: 2022 },
    { month: 'october', year: 2022 },
]

const BirdPage: React.FC = () => {
    const navigate = useNavigate()
    const { id, name } = useParams()
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

    const monthName = capitalizeFirstLetter(month)

    useEffect(() => {
        const birdName = birdData?.species.name || name
        if (birdName) {
            setHistoryLoading(true)
            Papa.parse(
                `/birdbuddyexplorer/data/${year}/${month}/${encodeURIComponent(
                    birdName
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
    }, [birdData?.species.name, month, name])

    const bird = birdData?.species
    const media = mediaData?.collectionCommunityMediaBySpeciesId

    return (
        <div className="m-8 px-4 py-8 sm:px-6 md:px-8 m-auto w-full">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="flex items-center text-4xl font-semibold text-gray-900">
                        {bird?.iconUrl ? (
                            <img
                                className="align-middle h-24 ml-8 mr-0"
                                src={bird.iconUrl}
                                alt="Bird Buddy Explorer"
                            />
                        ) : (
                            <img
                                className="h-12 align-middle mr-4"
                                src="/birdbuddyexplorer/android-chrome-512x512.png"
                                alt="Bird Buddy Explorer"
                            />
                        )}
                        {<span>{bird?.name || name}</span>}
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
                <div className="p-8 flex">
                    {name && (
                        <div className="mr-8">
                            <Select
                                label="Available Bird Data"
                                options={ALL_BIRDS_SORTED}
                                selectedValue={name}
                                selectOption={(option) => {
                                    navigate(reportPagePath(option))
                                }}
                            />
                        </div>
                    )}
                    <SelectMonth
                        disabled={mediaLoading || birdLoading || historyLoading}
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

                {!birdLoading && (
                    <div className="mx-8">
                        <div className="ml-4">
                            <div className="my-8">
                                <Stats
                                    records={records}
                                    uniqueLocations={uniqueLocations}
                                    loading={historyLoading}
                                />
                            </div>
                            <BirdCharts
                                records={records}
                                monthName={monthName}
                                bird={bird}
                                loading={historyLoading}
                            />
                            <div>
                                <Title>
                                    Locations of visits of{' '}
                                    {bird?.sentenceName || 'this bird'} in{' '}
                                    {capitalizeFirstLetter(month)} {year}
                                </Title>
                                <VisitsMap records={uniqueLocations} />
                            </div>
                            <BirdSounds bird={bird} />
                        </div>
                        <BirdGallery
                            bird={bird}
                            media={media}
                            loading={birdLoading || mediaLoading}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default BirdPage
