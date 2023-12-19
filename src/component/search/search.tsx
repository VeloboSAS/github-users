import React, { FC, useEffect, useState } from "react";
import s from './search.module.css'
import b from '../githubUsers/github.module.css'

type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}

export const Search: FC<SearchPropsType> = (props) => {

    const [tempSearch, setTempSearch] = useState(props.value)

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])
    
    return <div className={s.search}>
    <h1>Search GitHub Users</h1>
    <input placeholder="search" value={tempSearch} onChange={ (e) => setTempSearch(e.currentTarget.value)}/>
    <button className={b.btn} onClick={() => {
        props.onSubmit(tempSearch)
    }}>Find</button>
</div>
}