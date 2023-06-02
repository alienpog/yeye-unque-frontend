'use client'

import { SessionProvider as Provider } from "next-auth/react"
import { Session } from 'next-auth'
import {ReactNode} from 'react'

interface props{
    children: ReactNode,
    session: Session | null,
}
export function SessionProvider({children,session}: props) {
  return (
    <Provider>
        {children}
    </Provider>
  )
}

export default SessionProvider