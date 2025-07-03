import React, { useState } from 'react'

import axios from 'axios'

const Batch_Add = () => {
    

    const [name,setName] = useState('')
    const [trainer,setTrainer] = useState('')
    

     const token = localStorage.getItem("Token");

    const handelSubmit = async(e) =>{
        e.preventDefault()
   

        

        try{
            if (!token) {
            alert("User not authenticated");
            return;
        }
            const result = await axios.post('http://localhost:8082/batch/addbatch',
                {name,trainer},
                { 
                   headers: {
                   Authorization: `Bearer ${token}`, //  token add
                  
                    },
                }
            )
             if (result.data.message) {
                alert("Batch add Successfully ")
                setName('')
                setTrainer('')
               
               
            }

        
        }
        catch(err) {
             alert("Error occured! Batch")
             console.error('Error fetching Batch:', err)
        };

    
    }


  return (
   <>

   <div className='bg-white min-h-screen flex items-center justify-center p-4'>
    <div className='bg-gray-100 w-100 rounded-lg p-4 border border-black'>

        <h2 className='text-gray-900 text-2xl text-center font-bold'> Add Batch</h2>

        <form onSubmit={handelSubmit} className='space-y-4 mt-6'>


            <input type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Enter Name'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

             <input type="text"
            name="trainer"
            value={trainer}
            onChange={e => setTrainer(e.target.value)}
            placeholder='Enter  Trainer Name'
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

export default Batch_Add