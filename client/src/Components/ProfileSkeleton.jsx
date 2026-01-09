import React from 'react'

const ProfileSkeleton = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="animate-pulse space-y-6">
            <div className="h-9 bg-gray-200 rounded w-32"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-64"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton