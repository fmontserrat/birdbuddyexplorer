import { gql } from '@apollo/client'

export const BIRD_MEDIA = gql`
    query collectionCommunityMediaBySpeciesId(
        $speciesId: ID!
        $after: String
        $before: String
        $first: Int
        $last: Int
    ) {
        collectionCommunityMediaBySpeciesId(
            speciesId: $speciesId
            after: $after
            before: $before
            first: $first
            last: $last
        ) {
            ... on CollectionMediaConnection {
                edges {
                    cursor
                    node {
                        id
                        feederName
                        isShared
                        liked
                        likes
                        locationCity
                        locationCountry
                        media {
                            createdAt
                            id
                            state
                            thumbnailUrl
                        }
                        origin
                        ownerName
                        owning
                    }
                }
            }
        }
    }
`
