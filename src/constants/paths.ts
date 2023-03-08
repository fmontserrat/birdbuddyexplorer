import { Bird } from '../types'

export const LOGIN = '/birdbuddyexplorer/login'
export const ROOT = '/birdbuddyexplorer'
export const HOME = '/home/birdbuddyexplorer'

export const birdPagePath = (bird: Bird) => `/birdbuddyexplorer/bird/${bird.id}`
