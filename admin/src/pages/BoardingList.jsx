import React from 'react'
import { useEffect, useState } from 'react'
import {backendUrl, currency} from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'





const BoardingList = ({token}) => {

  const[list,setList] = useState([])

  const fetchList =async()=>{
    try{
      const response = await axios.get(backendUrl+'/api/boarding/list')

      if(response.data.success){
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
      
     

    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeBoarding =async (id) =>{
    try{
      const response =await axios.post(backendUrl+'/api/boarding/remove',{id},{headers:{token}})
      if(response.data.success){
       
        toast.success(response.data.message)
        fetchList() //refresh after deleted
    }else{
      toast.error(response.data.message)
    }

  }catch(e){
    console.log(e)
    toast.error(e.message)


  }
}
  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
    <p className = 'mb-2'>Boarding List</p>
    <div className = 'flex flex-col gap-2'>
      {/*---ListTable---*/}

      <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_2fr_2fr] items-center py-1 px-2 border bg-gray100 text-sm'>
        <b>Image</b>
        <b>Title</b>
        <b>OwnerName</b>
        <b>Monthly Price</b>
        <b className='text-center'>Action</b>

      </div>
      {/*-------Product List-------- */}

      {
        list.map((item, index) =>(
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_2fr_2fr_2fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt=""/>
            <p>{item.Title}</p>
            <p>{item.owner}</p>
            <p>{item.price}</p>
            <p onClick ={()=>removeBoarding(item._id)}className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
        ))
      }
      

    </div>
    </>
  )
}

export default BoardingList