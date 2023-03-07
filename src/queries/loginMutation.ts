import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
    mutation authEmailSignIn($email: String!, $password: String!) {
        authEmailSignIn(
            emailSignInInput: { email: $email, password: $password }
        ) {
            ... on Auth {
                accessToken
                refreshToken
            }
        }
    }
`

export const REFRESH_TOKEN_MUTATION = gql`
    mutation authRefreshToken($token: String!) {
        authRefreshToken(refreshTokenInput: { token: $token }) {
            ... on Auth {
                accessToken
                refreshToken
            }
        }
    }
`
