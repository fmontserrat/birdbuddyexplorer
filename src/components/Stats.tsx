import { VisitRecord } from '../types'
import React, { useEffect } from 'react'
import Loader from './Loader'

const Stats: React.FC<{
    records: VisitRecord[]
    uniqueLocations: VisitRecord[]
    loading: boolean
}> = ({ records, uniqueLocations, loading }) => {
    const [totalVisits, setTotalVisits] = React.useState<number>(0)
    const [totalFeeders, setTotalFeeders] = React.useState<number>(0)

    useEffect(() => {
        setTotalVisits(records.length)
        setTotalFeeders(uniqueLocations.length)
    }, [records])

    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 bg-cyan-100">
                    <dt className="truncate text-sm font-medium text-gray-500">
                        Total Visits
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                        {!loading && totalVisits}
                        {loading && (
                            <div className="mx-2 my-4">
                                <Loader small />
                            </div>
                        )}
                    </dd>
                </div>

                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 bg-cyan-100">
                    <dt className="truncate text-sm font-medium text-gray-500">
                        Number of feeders
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                        {!loading && totalFeeders}
                        {loading && (
                            <div className="mx-2 my-4">
                                <Loader small />
                            </div>
                        )}
                    </dd>
                </div>
            </dl>
        </div>
    )
}

export default Stats
