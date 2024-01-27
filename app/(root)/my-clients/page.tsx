import React from 'react'
import ClientDataTable from './data-table'

const MyClients = () => {
  return (
    <div className="flex flex-col w-full h-full p-3">
    <div className="flex-1">
      <ClientDataTable />
    </div>
  </div>
  )
}

export default MyClients