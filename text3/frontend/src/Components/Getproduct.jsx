import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GetProduct = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getproduct = async () => {
      try {
        const token = localStorage.getItem('Token')
        
        const res = await axios.get('http://localhost:8082/product/getproduct', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            })
        setProducts(res.data)
      } catch (err) {
        console.error('Error fetching products:', err)
      }
    }

    getproduct()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Product List</h2>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Discount (%)</th>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">User Email</th>
            <th className="border px-4 py-2">User Role</th>
          </tr>
        </thead>


        <tbody>
              {products.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">₹{item.price}</td>
              <td className="border px-4 py-2">{item.discount}</td>
              <td className="border px-4 py-2">{item.user_id._id || 'N/A'}</td>
              <td className="border px-4 py-2">{item.user_id.email || 'N/A'}</td>
              <td className="border px-4 py-2">{item.user_id.role || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GetProduct
