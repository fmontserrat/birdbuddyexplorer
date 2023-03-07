import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    InMemoryCache,
    HttpLink,
} from '@apollo/client'
import { GRAPHQL_URL } from './config/config'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './config/constants'
import { onError } from '@apollo/client/link/error'
import { AUTH_TOKEN_EXPIRED_ERROR } from './config/errors'
import { REFRESH_TOKEN_MUTATION } from './queries/loginMutation'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const errorHandler = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (networkError) {
            console.log(`[Network error]: ${networkError}`)
        }

        if (graphQLErrors) {
            graphQLErrors.forEach(async ({ message, locations, path }) => {
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                        locations
                    )}, Path: ${path}`
                )

                if (message === AUTH_TOKEN_EXPIRED_ERROR && apolloClient) {
                    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

                    if (refreshToken) {
                        const response = await apolloClient.mutate({
                            mutation: REFRESH_TOKEN_MUTATION,
                            variables: { token: refreshToken },
                        })

                        const accessToken =
                            response.data?.authRefreshToken?.accessToken ||
                            response.data?.accessToken
                        const newRefreshToken =
                            response.data?.authRefreshToken?.refreshToken ||
                            response.data?.refreshToken

                        if (accessToken) {
                            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
                            localStorage.setItem(
                                REFRESH_TOKEN_KEY,
                                newRefreshToken
                            )
                            return forward(operation)
                        }
                    }
                }
            })
        }
    }
)

const httpLink = new HttpLink({ uri: GRAPHQL_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    })

    return forward(operation)
})

export const apolloClient = new ApolloClient({
    uri: GRAPHQL_URL,
    link: ApolloLink.from([authMiddleware, errorHandler, httpLink]),
    cache: new InMemoryCache(),
})

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/home',
        element: <Dashboard />,
    },
])

root.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <RouterProvider router={router} />
        </ApolloProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
