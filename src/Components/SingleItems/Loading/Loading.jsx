import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import {BiErrorCircle} from 'react-icons/bi'
import {RxValueNone} from 'react-icons/rx'

function Loading() {
  return (
    <div style={{display:'flex',justifyContent:'space-around'}}>
        <CircularProgress color="success" />
    </div>
  )
}

export const Error=()=>{
    return(
        <div style={{display:'flex',flexDirection:'column',gap:'20px',alignItems:'center',minHeight:"300px",marginTop:"100px"}}>
            
                <h3 style={{textAlign:"center"}}>An Error occured and the Data could not be Fetched from Api</h3>
                <BiErrorCircle size={60} color='red'/>
            
        </div>
    )
}

export const NoData =({text}) =>{
  return(
    <div style={{display:'flex',flexDirection:'column',gap:'20px',alignItems:'center',minHeight:"300px",marginTop:"100px"}}>
            
                <h3 style={{textAlign:"center"}}>No {text} available at the moment, check again later</h3>
                <RxValueNone size={60} color='green'/>
            
        </div>
  )
}

export default Loading
