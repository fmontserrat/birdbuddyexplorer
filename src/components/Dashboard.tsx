import { useQuery } from '@apollo/client'
import { SEARCH_BIRDS } from '../queries/birdSearchQuery'
import BirdsTable from './BirdsTable'
import { Bird } from '../types'
import SearchBar from './SearchBar'
import React, { useCallback } from 'react'
import debounce from 'lodash.debounce'
import { SEARCH_DEBOUNCE_IM_MS } from '../config/constants'

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = React.useState('')

    const { loading, data } = useQuery(SEARCH_BIRDS, {
        variables: { searchQuery },
        skip: (searchQuery?.length || 0) <= 1,
    })

    const changeHandler = (value: string) => setSearchQuery(value)

    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, SEARCH_DEBOUNCE_IM_MS),
        []
    )

    return (
        <div className="m-8 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="flex items-center text-4xl font-semibold text-gray-900">
                        <img
                            className="h-12 align-middle mr-4"
                            src="/android-chrome-512x512.png"
                            alt="Bird Buddy Explorer"
                        />
                        <span>Bird Buddy Explorer</span>
                    </h1>
                </div>
            </div>
            <div className="relative w-100 mt-8">
                <div className="mt-4">
                    <SearchBar
                        value={searchQuery}
                        onChange={debouncedChangeHandler}
                    />
                </div>
            </div>
            <BirdsTable
                searchQuery={searchQuery}
                loading={loading}
                birds={data?.speciesSearch?.filter((b: Bird) => b.id) || []}
            />
        </div>
    )
}

export default Dashboard
