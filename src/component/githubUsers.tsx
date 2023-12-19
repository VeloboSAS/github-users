import axios from "axios";
import React, { useEffect, useState } from "react";
import s from './github.module.css'

type SearchUserType = {
    login: string,
    id: number
}

type SearchResult = {
    items: SearchUserType[]
}

export const Github = () => {

    const [selectedUsers, setSelectedUsers] = useState<SearchUserType | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState('')

    const fetchData = (term: string) => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`).then(res => {
            setUsers(res.data.items)
        })
    }

    useEffect(() => {
        console.log('SYNC TAB TITLE')
        
        if (selectedUsers) {
            document.title = selectedUsers.login
        }
    }, [selectedUsers])

    useEffect(() => {
        console.log('SYNC USERS')
        fetchData('it-kamasutra')
    }, [])

    return <div className={s.container}>

        <div>
            <div className={s.search}>
                <input placeholder="search" value={tempSearch} onChange={ (e) => setTempSearch(e.currentTarget.value)}/>
                <button onClick={() => {
                    fetchData(tempSearch)
                }}>find</button>
            </div>
            <ul>
                {users
                .map(u => <li key={u.id}className={selectedUsers === u ? s.selected: ''} onClick={() => {
                    setSelectedUsers(u)
                    }}>{u.login}</li>)}
            </ul>
        </div>
        <div className={s.details}>
            <h2>UserName</h2>
            <div>Details</div>
        </div>

    </div>
}