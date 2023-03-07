import React from 'react'
import { Bird } from '../types'
import IconWithTooltip from './IconWithTooltip'
import { cleanKey } from '../utils/keyCleaner'
import { useQuery } from '@apollo/client'
import { BIRD_MEDIA } from '../queries/birdMediaQuery'
import { MAX_PAGE_SIZE } from '../config/constants'
import BirdExpandedRow from './BirdExpandedRow'

const BirdRow: React.FC<{ bird: Bird }> = ({ bird }) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const { data, loading } = useQuery(BIRD_MEDIA, {
        variables: {
            speciesId: bird.id,
            first: MAX_PAGE_SIZE,
        },
        skip: !isExpanded,
    })

    return (
        <>
            <tr
                key={bird.id}
                className="cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                            <img
                                className="h-10 w-10"
                                src={bird.iconUrl}
                                alt=""
                            />
                        </div>
                        <div className="ml-4">
                            <div className="font-medium text-gray-900">
                                {bird.name}
                                {bird.alternativeName
                                    ? ` (${bird.alternativeName})`
                                    : ''}
                            </div>
                            <div className="text-gray-500 italic">
                                {bird.scientificName}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex">
                        {bird.badges.map((badge) => {
                            const key = `${bird.id}-${cleanKey(badge.name)}`

                            return (
                                <IconWithTooltip
                                    key={key}
                                    keyId={key}
                                    icon={badge}
                                    className="h-6 w-6"
                                />
                            )
                        })}
                    </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex">
                        {bird.favoriteFoods.map((food) => {
                            const key = `${bird.id}-${cleanKey(food.name)}`

                            return (
                                <IconWithTooltip
                                    key={key}
                                    keyId={key}
                                    icon={food}
                                    className="h-6 w-6"
                                />
                            )
                        })}
                    </div>
                </td>
            </tr>
            <BirdExpandedRow
                data={data}
                loading={loading}
                bird={bird}
                isExpanded={isExpanded}
            />
        </>
    )
}

export default BirdRow
