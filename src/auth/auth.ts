import { REFRESH_TOKEN_KEY } from '../config/constants'
import { REFRESH_TOKEN_MUTATION } from '../queries/loginMutation'
import { apolloClient } from '../index'

export const refreshToken = async (): Promise<{
    accessToken: string
    refreshToken: string
} | null> => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

    if (refreshToken) {
        const response = await apolloClient.mutate({
            mutation: REFRESH_TOKEN_MUTATION,
            variables: { token: refreshToken },
        })

        const newAccessToken =
            response.data?.authRefreshToken?.accessToken ||
            response.data?.accessToken
        const newRefreshToken =
            response.data?.authRefreshToken?.refreshToken ||
            response.data?.refreshToken

        return { accessToken: newAccessToken, refreshToken: newRefreshToken }
    }

    return null
}
