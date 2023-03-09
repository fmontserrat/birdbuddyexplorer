import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import ErrorBanner from './ErrorBanner'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import { LOGIN_MUTATION } from '../queries/loginMutation'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../auth'
import Select from './Select'
import { ALL_BIRDS_SORTED } from '../constants/allbirds'
import { reportPagePath } from '../constants/paths'

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

    useEffect(() => {
        redirectIfAuthenticated()
    }, [data])

    const redirectIfAuthenticated = () => {
        const accessToken =
            data?.authEmailSignIn?.accessToken || data?.accessToken
        const refreshToken =
            data?.authEmailSignIn?.refreshToken || data?.refreshToken

        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
            navigate('/home')
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        await authEmailSignIn({ variables: { email, password } })
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="/birdbuddyexplorer/android-chrome-512x512.png"
                    alt="Bird Buddy Explorer"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign in using your Bird Buddy account
                </h2>
            </div>

            {loading && (
                <div className="mt-8 flex justify-center">
                    <Loader />
                </div>
            )}

            {!loading && (
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-8">
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
                                    disabled={loading}
                                    onClick={onSubmit}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div className="mt-12 text-gray-600 text-center flex flex-col">
                            <div>
                                <div>Or select a reported bird</div>
                                <div className="text-xs">
                                    (without BirdBuddy API access)
                                </div>
                            </div>
                            <div className="m-auto pt-2">
                                <Select
                                    options={ALL_BIRDS_SORTED}
                                    selectOption={(option) => {
                                        navigate(reportPagePath(option))
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login
