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
