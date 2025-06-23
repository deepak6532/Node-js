import React, { useState } from 'react'
import axios from 'axios'

const Addproduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')

    const handelSubmit = async (e) => {
        e.preventDefault()

        try {

        const token = localStorage.getItem("Token");
        if (!token) {
            alert("User not authenticated");
            // return;
        }

        const res = await axios.post("http://localhost:8082/product/addproduct",{ name, price, discount },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        

            // console.log("Server response:", res.data)
            if (res.data.message) {
                alert("product added")
                setName('')
                setPrice('')
                setDiscount('')
            }
        } catch (err) {
            // console.error("Error adding product:", err)
            alert("error occurred")
        }
    }

    return (
        <div className="bg-blue-400 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg border p-8 w-90">
                <h2 className="text-center text-2xl text-gray-800 font-bold mb-10">Addproduct</h2>
                <form onSubmit={handelSubmit} className='space-y-4'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className='w-full border-2 border-black px-6 py-2 rounded-lg'
                    />
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        className='w-full border-2 border-black px-6 py-2 rounded-lg'
                    />
                    <input
                        type="text"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="Enter discount"
                        className='w-full border-2 border-black px-6 py-2 rounded-lg'
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 px-5 py-2 rounded-lg text-white font-bold"
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Addproduct
