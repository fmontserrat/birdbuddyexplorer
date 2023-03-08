import { VisitRecord } from '../types'
import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { MapPinIcon } from '@heroicons/react/20/solid'

const VisitsMap: React.FC<{ records: VisitRecord[] }> = ({ records }) => (
    <div className="p-4">
        <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {records.map((r: VisitRecord, index) => {
                const lat = Number(r.anonymized_latitude)
                const lon = Number(r.anonymized_longitude)

                if (isNaN(lat) || isNaN(lon)) {
                    return null
                }

                return (
                    <Marker
                        key={JSON.stringify(r) + index}
                        position={[lat, lon]}
                    >
                        <MapPinIcon />
                    </Marker>
                )
            })}
        </MapContainer>
    </div>
)

export default VisitsMap
