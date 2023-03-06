import React from 'react'
import { gql, useMutation } from '@apollo/client'
import ErrorBanner from './ErrorBanner'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'

const LOGIN_MUTATION = gql`
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

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    const [authEmailSignIn, { loading, data, error }] = useMutation(
        LOGIN_MUTATION,
        {
            variables: { email, password },
        }
    )

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await authEmailSignIn({ variables: { email, password } })
        if (data?.authEmailSignIn?.accessToken) {
            sessionStorage.setItem(
                'accessToken',
                data.authEmailSignIn.accessToken
            )
            sessionStorage.setItem(
                'refreshToken',
                data.authEmailSignIn.refreshToken
            )

            navigate('/home')
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="/android-chrome-512x512.png"
                    alt="Bird Buddy Explorer"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign in using your Bird Buddy account
                </h2>
            </div>

            {!loading && (
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {(error ||
                            (data && !data?.authEmailSignIn?.accessToken)) && (
                            <div className="my-4">
                                <ErrorBanner
                                    message={
                                        JSON.stringify(error) ||
                                        'Your email or password is incorrect'
                                    }
                                />
                            </div>
                        )}

                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* <div className="flex items-center justify-between">*/}
                            {/*    <div className="flex items-center">*/}
                            {/*        <input*/}
                            {/*            id="remember-me"*/}
                            {/*            name="remember-me"*/}
                            {/*            type="checkbox"*/}
                            {/*            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                            {/*        />*/}
                            {/*        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">*/}
                            {/*            Remember me*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/* </div>*/}

                            <div>
                                <button
                                    onClick={onSubmit}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                    {loading && <Loader />}
                </div>
            )}
        </div>
    )
}

export default Login
