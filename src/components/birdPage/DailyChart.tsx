import * as V from 'victory'
import React, { useEffect, useState } from 'react'
import { VisitRecord } from '../../types'
import { VictoryTheme } from 'victory'

interface Data {
    day: number
    visits: number
}

const HourlyChart: React.FC<{ records: VisitRecord[] }> = ({ records }) => {
    const [data, setData] = useState<Data[]>([])

    useEffect(() => {
        const newData = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ].map((i) => {
            return { day: i + 1, visits: 0 }
        })
        records.forEach((r) => {
            const day = new Date(r.timestamp).getDate()
            newData[day] = {
                day: newData[day].day,
                visits: newData[day].visits + 1,
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
                    tickCount={5}
                    tickFormat={(x) => `day ${x}`}
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
                        data: { fill: '#27aeef' },
                    }}
                    data={data}
                    x="hour"
                    y="visits"
                    barRatio={0.7}
                    theme={VictoryTheme.material}
                    domain={{ x: [0, 31] }}
                />
            </V.VictoryChart>
        </div>
    )
}

export default HourlyChart
