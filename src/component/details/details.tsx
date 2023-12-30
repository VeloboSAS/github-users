import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { SearchUserType, UserType } from "../githubUsers/githubUsers";
import { Timer } from "../timer/timer";

type UserDetailsPropsType = {
    user: SearchUserType | null
}

const startTimerSeconds = 10

export const UserDetails: FC<UserDetailsPropsType> = (props) => {

    const [userDetails, setUserDetails] = useState<null | UserType>(null) 
    const [seconds, setSeconds] = useState(startTimerSeconds)

    useEffect(() => {
        console.log('SYNC USERS DETAILS')
        if (!!props.user) {
            axios.get<UserType>(`https://api.github.com/users/${props.user.login}`).then(res => {
                setSeconds(startTimerSeconds)
                setUserDetails(res.data)

        })}
    }, [props.user])

    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
        }
    }, [seconds])

    return <div >
                <h2>User Details</h2>
                {userDetails && <>
                <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetails.id.toString()}/>
                <h3>{userDetails.login}</h3>
                <div style={{fontSize:'0.8em'}}>
                    <img src={userDetails.avatar_url} 
                    style={{width: '18vh'}}  alt=''/>
                    <br/>
                    folowers: {userDetails.followers}
                    <br/>
                    url: {userDetails.url}
                </div>
                </>
            }
            </div>
}