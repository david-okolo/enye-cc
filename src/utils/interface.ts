export interface PastSearch {
    keyword: string
    radius: number
    timestamp: number
}

export interface Profile {
    _id: string
    pastSearches: PastSearch[]
}