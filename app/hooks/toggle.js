import { useState } from 'react'

export function useToggle({ initState }) {
    const [value, setValue] = useState(initState)

    const toggle = () => setValue(prevState => !prevState)

    return [value, toggle]
}