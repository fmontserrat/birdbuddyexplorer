import React from 'react'
import { Bird } from '../types'
import Loader from './Loader'
import BirdRow from './BirdRow'

const BirdsTable: React.FC<{
    birds: Bird[]
    loading: boolean
    searchQuery: string
}> = ({ birds, loading, searchQuery }) => {
    return (
        <div className="flow-root mt-4 w-100">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    {loading && (
                        <div className="flex justify-center mt-8">
                            <Loader />
                        </div>
                    )}
                    {!!birds.length && (
                        <table className="min-w-full divide-y divide-gray-300 border-collapse table-auto">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Badges
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Eats
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {birds.map((bird) => (
                                    <BirdRow key={bird.id} bird={bird} />
                                ))}
                            </tbody>
                        </table>
                    )}
                    {!birds.length && !!searchQuery?.length && !loading && (
                        <div className="flex justify-center mt-8 text-xl text-gray-600">
                            No birds called{' '}
                            <b className="mx-1"> {` ${searchQuery} `} </b> were
                            found
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BirdsTable
