import * as V from 'victory'
import React, { useEffect, useState } from 'react'
import { VisitRecord } from '../../types'
import { VictoryTheme } from 'victory'

interface Data {
    hour: number
    visits: number
}

const HourlyChart: React.FC<{ records: VisitRecord[] }> = ({ records }) => {
    const [data, setData] = useState<Data[]>([])

    useEffect(() => {
        const newData = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23,
        ].map((i) => {
            return { hour: i, visits: 0 }
        })
        records.forEach((r) => {
            const hour = new Date(r.timestamp).getHours()
            newData[hour] = {
                hour: newData[hour].hour,
                visits: newData[hour].visits + 1,
            }
        })
        setData(newData)
    }, [records])

    if (!data.length) {
        return null
    }

    return (
        <div>
            <V.VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                height={400}
                width={400}
            >
                <V.VictoryAxis
                    style={{
                        tickLabels: { fontSize: 10 },
                    }}
                    tickCount={12}
                    tickFormat={(x) => `${x}h`}
                />
                <V.VictoryAxis
                    dependentAxis
                    style={{
                        tickLabels: { fontSize: 10 },
                    }}
                    tickFormat={(x) => `${x}\n visits`}
                />
                <V.VictoryBar
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 },
                    }}
                    style={{
                        data: { fill: '#ea5545' },
                    }}
                    data={data}
                    x="hour"
                    y="visits"
                    barRatio={0.7}
                    theme={VictoryTheme.material}
                    domain={{ x: [0, 24] }}
                />
            </V.VictoryChart>
        </div>
    )
}

export default HourlyChart
