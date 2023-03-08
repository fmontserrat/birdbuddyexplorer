import Title from '../Title'
import DailyChart from './DailyChart'
import HourlyChart from './HourlyChart'
import React from 'react'
import { Bird, VisitRecord } from '../../types'
import Loader from '../Loader'

const BirdCharts: React.FC<{
    records: VisitRecord[]
    monthName: string
    bird?: Bird
    loading: boolean
}> = ({ records, monthName, bird, loading }) => {
    return (
        <div className="pb-8">
            <div className="lg:flex justify-evenly">
                <div>
                    <Title>
                        Distribution of visits of{' '}
                        {bird?.sentenceName || 'this bird'} during {monthName}
                    </Title>
                    {!!records?.length && (
                        <DailyChart records={records || []} />
                    )}
                    {loading && (
                        <div className="flex justify-center m-auto mb-16 mt-8">
                            <Loader />
                        </div>
                    )}
                </div>
                <div>
                    <Title>
                        Distribution of visits of{' '}
                        {bird?.sentenceName || 'this bird'} during per hour
                    </Title>
                    {!!records?.length && (
                        <HourlyChart records={records || []} />
                    )}
                    {loading && (
                        <div className="flex justify-center m-auto mb-16 mt-8">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BirdCharts
