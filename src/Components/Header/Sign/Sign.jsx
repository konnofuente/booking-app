import React from 'react';
import {HiPlusSm} from 'react-icons/hi';
import {TbMinus} from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import './Sign.css';

function Sign({text='Default',link}) {
    const [hover,setHover] = React.useState(false);
    const divStyle ={
        color:hover?'#b89146':'white',
        transition:'.3s',
        cursor:'pointer',
    };
    const navigate = useNavigate(); // Initialize the hook

    const handleButtonClick = () => {
      navigate(link);
    }

  return (
    <div 
    onClick={handleButtonClick}
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{...divStyle}} className='single-headerContainer-line'>
        <span style={{fontSize:'18px'}}>{text}</span>
        {hover?<TbMinus size={13} style={{position:'relative',top:'2px',left:'5px'}} className='keyChange'/>:
        <HiPlusSm size={13} style={{position:'relative',top:'2px',left:'3px'}} className='keyChange'/>}
    </div>
  )
}

export default Sign;
