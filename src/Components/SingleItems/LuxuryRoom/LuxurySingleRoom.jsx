/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { css,keyframes } from '@emotion/react'
import {AiOutlineRightCircle} from 'react-icons/ai'
import { useState} from 'react'
import { Collapse} from '@mui/material'


const priceDiv = css`
    p{
        color:#b89146;
        font-weight:600;
        font-size:14px;
        line-height:24px;

        span{
            color:white;
        }
    }
`


const nameDiv = css`
    h3{
        color:white;
        font-weight:500;
        font-size:24px;
        line-height:40px;
        margin-bottom:10px;
    }
`

const bookingDiv = css`
    color:#999999;
    border-top:1px solid #999999;
    padding:15px 0px;
    width:100%;

    svg{
        position:relative;
        margin-top:2px;
        top:3px
    }
    &:hover {
        display:block;
        cursor:pointer;
        color:#b89146;
    };

`

const contentContainer = css`
    position:absolute;
    bottom:10px;
    left: 0;
    right: 0;
    margin:30px;
`

function LuxurySingleRoom({room}) {

    //Getting and setting The image URL
    const [mouseIn,setMouseIn] = useState(false)
    const image = room.propertyImage.image.url.split('?')[0];

      const parentDiv = css `
    height:357px;
    margin:5px 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    position:relative;
    background-color:none;
    background-size:cover;
    background-image:url(${image});
    background-position:center;
    background-repeat:no-repeat;
    transition:all 300ms ease-in;
    &:before{
        
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            bottom: 0;
            z-index: 0;
            background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(14, 19, 23, 0)), to(#0E1317));
    }
    `
  return (
    <div css={parentDiv} onMouseEnter={()=>setMouseIn(true)} onMouseLeave={()=>setMouseIn(false)}>

                <Collapse in={mouseIn} collapsedSize={70} orientation="vertical" timeout={500} css={contentContainer}>
                            <div css={priceDiv}>{/*  Price section */}
                                <p> {room.price?.options[0]?.formattedDisplayPrice || "$$"} <span> / {room.price.priceMessages[0].value}</span></p> 
                            </div>
                            <div css={nameDiv}>{/*  Name section */}
                                <h3>{room.name}</h3>
                            </div>
                                <a href={`/Amenity/property/${room.id}`}>
                                    <div css={bookingDiv} className='showMe'>{/*  Booking Now section */}
                                        <p><AiOutlineRightCircle/> BOOK NOW</p>
                                    </div>
                                </a>
                </Collapse>
    </div>
  )
}

export default LuxurySingleRoom
