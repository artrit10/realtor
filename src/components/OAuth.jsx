import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { db } from '../firebase'
export default function OAuth() {

    const navigate = useNavigate();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const docRef = doc(db, "users", result.user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: result.user.displayName,
                    email: result.user.email,
                    timestamp: serverTimestamp()
                });
            }

            navigate('/');

        } catch (error) {

            toast("Google authentication failed!")
        }
    }
    return (
        <button
            type='button'
            onClick={onGoogleClick}
            className='flex 
    items-center 
    justify-center w-full 
    bg-red-700 text-white 
    px-7 py-3 uppercase 
    text-sm font-medium 
    hover:bg-red-800
    active:bg-red-900 
    shadow-md 
    hover:shadow-lg transition 
    duration-150 ease-in-out rounded'><FcGoogle className='text-2xl 
    bg-white rounded-full mr-2'></FcGoogle>Continue with Google</button>
    )
}
