import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { SearchUserType, UserType } from "../githubUsers/githubUsers";

type UserDetailsPropsType = {
    user: SearchUserType | null
}

export const UserDetails: FC<UserDetailsPropsType> = (props) => {

    const [userDetails, setUserDetails] = useState<null | UserType>(null) 

    useEffect(() => {
        console.log('SYNC USERS DETAILS')
        if (!!props.user) {
            axios.get<UserType>(`https://api.github.com/users/${props.user.login}`).then(res => {
                setUserDetails(res.data)
        })}
    }, [props.user])

    return <div >
                <h2>User Details</h2>
                {userDetails && <>
                <h3>{userDetails.login}</h3>
                <div>
                    <img src={userDetails.avatar_url} width={150} height={150} alt=''/>
                    <br/>
                    folowers: {userDetails.followers}
                    <br/>
                    url: {userDetails.url}
                </div>
                </>
            }
            </div>
}