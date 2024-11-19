
import { PRODUCT_URL } from '@/lib/endpoints'
import axios from 'axios'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from "@/app/dashboard/products/_components/columns"
import { cookies } from 'next/headers'

  
const ProductsPage = async () => {
  
  const products = await axios.get(PRODUCT_URL,
    {
        headers:{
            Authorization: `${cookies().get('token')?.value}`
        }
    })
        
  return (
    <div className='p-4 w-full '>
        <div className='flex gap-2 w-full'>
            <DataTable columns={columns} data={products.data.reverse()} />
        </div>
    </div>
  )
}

export default ProductsPage