import React from 'react'
import ClientDataTable from './data-table'

const MyClients = () => {
  return (
    <div className="flex flex-col w-full h-full p-3">
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">My Clients</h1>
      <ClientDataTable />
    </div>
  </div>
  )
}

export default MyClients