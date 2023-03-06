import { gql, useQuery } from '@apollo/client'

const SEARCH_BIRDS = gql`
    query {
        speciesSearch(searchQuery: "bird") {
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

const Dashboard = () => {
    const { loading, error, data } = useQuery(SEARCH_BIRDS)

    if (loading) return <div>Loading...</div>

    if (error) return <div>Error! {error?.message}</div>

    return <div>{JSON.stringify(data)}</div>
}

export default Dashboard
