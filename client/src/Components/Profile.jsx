import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProfileSkeleton from './ProfileSkeleton'
import {toast} from 'react-toastify'
const Profile = () => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(flase)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/users/profile")
        console.log(response.data.user);
        setUser(response.data.user)
      } catch (error) {
        const errorMessage = error.response?.data.message || "Failed to fetch profile data"
        toast.error(error)

      } finally {
        setLoading(flase)
      }
    }
    fetchProfile()
  }, [navigate])

  if (loading) {
    return <ProfileSkeleton></ProfileSkeleton>
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No user data found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <p className="text-lg text-gray-900">{user.email}</p>
            </div>
            {user.username && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Username
                </label>
                <p className="text-lg text-gray-900">{user.username}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile