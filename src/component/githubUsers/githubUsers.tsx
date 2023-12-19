import React, { FC, useEffect, useState } from "react"
import { UserDetails } from "../details/details"
import s from './github.module.css'
import { UserList } from "../list/list"
import { Search } from "../search/search"


export type SearchUserType = {
    login: string,
    id: number
}

export type SearchResult = {
    items: SearchUserType[]
}

export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
    url: string
}

export const Github: FC = () => {

    let initialSearchState = 'it-kamasutra'
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [searchTerm, setSearchTerm] = useState(initialSearchState)

    useEffect(() => {
        console.log('SYNC TAB TITLE')
        
        if (!!selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return <div className={s.container}>

        <div className={s.search}>
            <Search value={searchTerm} onSubmit={(value: string) => {
                setSearchTerm(value)}}/>
            <button className={s.btn} onClick={() => setSearchTerm(initialSearchState) }>Reset</button>
        </div>
        <div className={s.list}>
            <UserList term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser}/>
        </div>
        <div className={s.details}>
            <UserDetails user={selectedUser}/>
        </div>
    </div>
}