import React from 'react'
import { useParams } from 'react-router-dom'
import BirdExpandedRow from '../components/BirdExpandedRow'
import { useQuery } from '@apollo/client'
import { BIRD_MEDIA } from '../queries/birdMediaQuery'
import { MAX_PAGE_SIZE } from '../constants/config'
const BirdPage: React.FC = () => {
    const { id } = useParams()
    const { data, loading } = useQuery(BIRD_MEDIA, {
        variables: {
            speciesId: id,
            first: MAX_PAGE_SIZE,
        },
        skip: !id,
    })

    return (
        <div>
            <h2>{id}</h2>
            <BirdExpandedRow loading={loading} data={data} />
        </div>
    )
}

export default BirdPage
