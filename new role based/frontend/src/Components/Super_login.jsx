import React from 'react'

const Super_login = () => {
  return (
    <>

   <div className='bg-gray-200 min-h-screen flex items-center justify-center p-4'>
    <div className='bg-gray-100 w-100 rounded-lg p-4 border border-black'>

        <h2 className='text-gray-900 text-2xl text-center font-bold'>Super admin Login</h2>

        <form className='space-y-4 mt-6'>


            <input type="text"
            name="email"
            placeholder='Enter Email'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <input type="password"
            name="password"
            placeholder='Enter Password'
            className='p-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            {/* <input type="role"
            name="role"
            placeholder='Enter role'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input> */}

            <button  type="submit" 
            className='w-full rounded-lg bg-blue-500 p-2 hover:bg-blue-600 cursor-pointer '>
                Submit

            </button>

        </form>
    </div>
   </div>
   
   
   
   </>
  )
}

export default Super_login