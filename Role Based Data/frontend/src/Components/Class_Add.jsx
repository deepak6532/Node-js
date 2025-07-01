import React, { useState } from 'react'

import axios from 'axios'

const Class_Add = () => {
    

    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [price,setPrice] = useState('')

     const token = localStorage.getItem("Token");

    const handelSubmit = async(e) =>{
        e.preventDefault()
   

        

        try{
            if (!token) {
            alert("User not authenticated");
            return;
        }
            const result = await axios.post('http://localhost:8082/product/addproduct',
                {name,category,price},
                { 
                   headers: {
                   Authorization: `Bearer ${token}`, // ✅ Add token here
                  
                    },
                }
            )
             if (result.data.message) {
                alert("Class add Successfully ")
                setName('')
                setCategory('')
                setPrice('')
               
            }

        
        }
        catch(err) {
             alert("Error occured!")
             console.error('Error fetching Users:', err)
        };

    
    }


  return (
   <>

   <div className='bg-white min-h-screen flex items-center justify-center p-4'>
    <div className='bg-gray-100 w-100 rounded-lg p-4 border border-black'>

        <h2 className='text-gray-900 text-2xl text-center font-bold'> Add Class</h2>

        <form onSubmit={handelSubmit} className='space-y-4 mt-6'>


            <input type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Enter Name'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <input type="text"
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder='Enter category'
            className='p-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <input type="text"
            name="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder='Enter Price'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <button  type="submit" 
            className='w-full rounded-lg text-xl text-white font-semibold bg-blue-600 p-2 hover:bg-blue-700 cursor-pointer '>
                Submit

            </button>

        </form>
    </div>
   </div>
   
   
   
   </>
  )
}

export default Class_Add