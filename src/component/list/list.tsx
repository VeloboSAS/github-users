import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { SearchResult, SearchUserType } from "../githubUsers/githubUsers";
import s from './list.module.css'

type UsersListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}

export const UserList: FC<UsersListPropsType> = (props) => {

    const [users, setUsers] = useState<SearchUserType[]>([])

    useEffect(() => {
        console.log('SYNC USERS')
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`).then(res => {
            setUsers(res.data.items)
        })
    }, [props.term])

    
    return <>
            <h2>List Users</h2>
            <div>
            {users
            .map(u => <div key={u.id} className={props.selectedUser === u ? s.selected: ''} onClick={() => {
                props.onUserSelect(u)
                }}>{u.login}</div>)}
            </div>
        </>
}