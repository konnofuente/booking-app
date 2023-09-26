import React from 'react'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

function Button({text='submit',from='#b89146',to='white', textTo='white', textFrom='black', big=false,small=false ,width='auto',border=false,showBg=true ,linksTo="/"}) {
const [hover,setHover] = React.useState(false);


    const btnStyleDiv={
        display:'flex',
        gap:'8px',
        background:`linear-gradient(to right, ${to} 50%, ${from} 50%)`,
        backgroundSize: '230% 80%',
        backgroundPosition:hover?'left bottom':'right bottom',
        alignItems:'center',
        padding: small?'0px':'15px 40px',
        cursor:'pointer',
        transition: 'all .5s ease-out',
        width:`${width}`,
        border:border?'1px solid #b89146':'none'
    }

    const inner = {
        transition: 'all .6s ease-out',
        color:hover?textFrom:textTo,
    }
  return (
    <div style={{...btnStyleDiv}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
        <a href={linksTo} style={{...inner}} className={big?"bigButton":""}>{text} <HiOutlineArrowNarrowRight style={{position:'relative',top:'2px',left:'5px'}}/></a>
    </div>
  )
}

export default Button
