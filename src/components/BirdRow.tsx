import React from 'react'
import { Bird } from '../types'
import IconWithTooltip from './IconWithTooltip'

const BirdRow: React.FC<{ bird: Bird }> = ({ bird }) => (
    <tr key={bird.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
            <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10" src={bird.iconUrl} alt="" />
                </div>
                <div className="ml-4">
                    <div className="font-medium text-gray-900">{bird.name}</div>
                    <div className="text-gray-500 italic">
                        {bird.scientificName}
                    </div>
                </div>
            </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="flex">
                {bird.badges.map((badge) => {
                    const key = `${bird.id}-${badge.name.replaceAll(' ', '_')}`

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
                    const key = `${bird.id}-${food.name.replaceAll(' ', '_')}`

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
)

export default BirdRow
