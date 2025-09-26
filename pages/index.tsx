import React from 'react'
import Mato from './components/Mato'
import Lucky from './lucky.md'


export default function index() {
  return (
    <>
    <div className="text-center bg-red-100">Welcome home</div>
    
   <h1 className="text-center bg-blue-100">
      Hello this is a test!
    </h1>
    <Mato/> 
   <Lucky/>
    
    </>
  )
}
