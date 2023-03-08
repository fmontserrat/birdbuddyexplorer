import Title from '../Title'
import { cleanKey } from '../../utils/keyCleaner'
import { MusicalNoteIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Bird } from '../../types'

const BirdSounds: React.FC<{ bird?: Bird }> = ({ bird }) => {
    if (!bird || !bird.sounds?.length) {
        return null
    }

    return (
        <>
            {bird.sounds.filter((s) => !!s.url || s.sourceUrl).length && (
                <div className="mt-8">
                    <Title>Hear the songs of a {bird.sentenceName}</Title>
                    <div className="flex mt-4 mb-8 flex-row w-100 flex-wrap">
                        {bird.sounds.map((sound) => {
                            if (!sound.sourceUrl && !sound.url) {
                                return null
                            }
                            const key = `${bird.id}-${cleanKey(
                                sound.url || sound.sourceUrl
                            )}`

                            return (
                                <div key={key} className="flex m-2">
                                    <audio controls>
                                        <source
                                            src={sound.url}
                                            type="audio/mpeg"
                                        />
                                        <a href={sound.url}>
                                            <MusicalNoteIcon
                                                className="h-5 w-5 text-red-400 mx-2"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </audio>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default BirdSounds
