import React from 'react'
import Regform from './Regform'
import { useContext } from 'react';
import { UserContext } from './ContextStudent'


export default function BeforeReg() {
    const user = useContext(UserContext);

    console.log(user.user)
    return (
        <div>
            <Regform user={user.user[0]} />
        </div>
    )
}
