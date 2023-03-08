import { VisitRecord } from '../../types'
import React, { useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import * as L from 'leaflet'
import { LatLng } from 'leaflet'

const VisitsMap: React.FC<{ records: VisitRecord[] }> = ({ records }) => {
    const group: L.FeatureGroup = new L.FeatureGroup([])
    const mapRef = React.useRef<L.Map>(null)

    useEffect(() => {
        records
            .map((r) => {
                return [
                    Number(r.anonymized_latitude),
                    Number(r.anonymized_longitude),
                ]
            })
            .filter((r) => !isNaN(r[0]) && !isNaN(r[1]))
            .map((r) => {
                const marker = new L.Marker(new LatLng(r[0], r[1]))
                mapRef.current && marker.addTo(mapRef.current)
                group.addLayer(marker)
            })

        mapRef.current && mapRef.current.fitBounds(group.getBounds())
    }, [records])
    return (
        <div className="p-4">
            <MapContainer
                center={[0, 0]}
                zoom={2}
                scrollWheelZoom={false}
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default VisitsMap
