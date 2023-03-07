import { gql } from '@apollo/client'

export const SEARCH_BIRDS = gql`
    query speciesSearch($searchQuery: String!) {
        speciesSearch(searchQuery: $searchQuery) {
            ... on SpeciesBird {
                id
                name
                scientificName
                sentenceName
                weightFrom
                weightTo
                isUnofficialName
                alternativeName
                definiteArticle
                indefiniteArticle
                genderOfName
                iconUrl
                lengthFrom
                lengthTo
                mapUrl
                badges {
                    ... on SpeciesBadge {
                        description
                        iconUrl
                        name
                    }
                }
                favoriteFoods {
                    ... on SpeciesFood {
                        name
                        iconUrl
                    }
                }
            }
        }
    }
`
