import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import toast from 'react-toastify'
import navigate from 'react-router-dom'
import ProfileSkeleton from './ProfileSkeleton'
const Profile = () => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(flase)
  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/users/profile")
        console.log(response.data.user);
        setUser(response.data.user)
      } catch (error) {
        const errorMessage = error.response?.data.message || "Failed to fetch profile data"
        toast.error(error)

      }finally{
        setLoading(flase)
      }
    }
    fetchProfile()
  },[navigate])

  if(loading){
    return <ProfileSkeleton></ProfileSkeleton>
  }
  if(!user){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No user data found</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      
    </div>
  )
}

export default Profile