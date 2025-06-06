import React from 'react'
import AdminSidebar from '../../components/admin/sidebar/AdminSidebar'
import Users from '../../components/admin/users/users'

const AdminUsers = () => {
  return (
   <>
     <div className="flex h-screen  text-white overflow-hidden">

        <AdminSidebar />
        <Users/>

       
      </div>
   </>
  )
}

export default AdminUsers