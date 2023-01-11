import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../firebase';
export default function Profile() {

  const navigate = useNavigate()
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const [changeDetail, setChangeDetail] = useState(false)
  const onLogout = () => {
    auth.signOut();
    navigate('/')
  }
  const { name, email } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name
        })
        toast.success('Profile details updated successfully!')
      }
    } catch (error) {
      toast.error('Could not update profile details!')
    }
  }
  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='3xl text-center font-bold mt-6'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            <input type="text" id='name' onChange={onChange} value={name} disabled={!changeDetail}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-green-200 focus:bg-green-200"}`} />
            <input type="email" id='email' value={email} disabled
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-green-200 focus:bg-green-200"}`} />
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p className='flex items-center'>
                Do you want to change your name?
                <span onClick={() => {
                  changeDetail && onSubmit()
                  setChangeDetail((prevState) => !prevState)
                }}
                  className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>
                  {changeDetail ? 'Apply changes' : 'Edit'}
                </span>
              </p>
              <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'>Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
