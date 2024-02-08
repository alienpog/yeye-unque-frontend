"use client"
import Clock from 'react-live-clock';

function AdminNavClock() {
  return (
    <>
    <Clock
    format={'h:mm'}
    style={{fontSize: '4em', fontWeight:900, color: "white"}}
    ticking={true} />
    </>
  )
}

export default AdminNavClock