import React from 'react'
import AdminSidebar from '../../components/admin/sidebar/AdminSidebar'
import MembershipPlans from '../../components/admin/plans/MembershipPlans'

const AdminPlans = () => {
  return (
    <>
     <div className="flex h-screen  text-white overflow-hidden">

        <AdminSidebar />
        <MembershipPlans/>
       
      </div>
    </>
  )
}

export default AdminPlans