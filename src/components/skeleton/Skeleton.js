import React from 'react'
import './skeleton.css'

export default function Skeleton() {
  return (
    <div className='container_skeleton'>
        {Array.from({ length: 12}, (_, index) => (   
            <div className='skeleton_row'>
                {Array.from({ length: 8}, (_, index) => (   
                    <div className='skeleton'></div>
                ))}
            </div>                 
        ))}
    </div>
  )
}
