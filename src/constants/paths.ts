import { Bird } from '../types'

export const LOGIN = '/login'
export const ROOT = '/'
export const HOME = '/home'

export const birdPagePath = (bird: Bird) => `/bird/${bird.id}`
