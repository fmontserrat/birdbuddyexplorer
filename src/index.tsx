import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { GRAPHQL_URL } from './config/config'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export const apolloClient = new ApolloClient({
    uri: GRAPHQL_URL,
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
