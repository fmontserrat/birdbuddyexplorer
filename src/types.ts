export interface Bird {
    id: string
    name: string
    scientificName: string
    sentenceName: string
    weightFrom: number
    weightTo: number
    iconUrl: string
    badges: Badge[]
    favoriteFoods: Food[]
    sounds: Sound[]
    indefiniteArticle: string
    definiteArticle: string
    alternativeName?: string
    genderOfName?: string
    isUnofficialName: boolean
    mapUrl: string
}

export interface Badge {
    name: string
    description: string
    iconUrl: string
}

export interface Food {
    name: string
    iconUrl: string
}

export interface Edge {
    cursor: string
    node: Node
}

export interface Node {
    id: string
    feederName: string
    isShared: boolean
    liked: boolean
    likes: number
    locationCity: string
    locationCountry: string
    media: Media
}

export interface Media {
    createdAt: number
    id: string
    state: string
    thumbnailUrl: string
    origin: string
    ownerName: string
    owning: boolean
}

interface Sound {
    authorName: string
    sourceUrl: string
    url: string
}
