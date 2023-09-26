/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import React,{useContext, useState} from 'react'
import { Grid } from '@mui/material';
import { MediaQueryContext } from '../../Hooks/MediaQueryContext';
import {MdReviews} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineXMark} from 'react-icons/hi2'
import {IoCheckmark} from 'react-icons/io5'
import {BiChevronRightSquare} from 'react-icons/bi'





function SingleResult({propInfo,desc}) {
const medias = useContext(MediaQueryContext)
const [theDesc,setDesk] = useState(desc)

const contentMainContainer = css `
    padding:20px;

    & p{
        color:white;
        line-height:25px;
        display:flex;
        gap:10px;

    }
`
const contentLeftContainer = css `
    & h1 {
        color:white;
        text-align:unset !important;
    }

`
const contentRightContainer = css `
    border-left:${medias.DT? "1px solid white" : "none"};
    height:160px;
    text-align:center;

    & p{
        color:white;
        align-items:center;
        justify-content:${medias.DT?"center":"unset"};
    }

    
`

const propContainer = css `
    height:fit-content;
    width:100%;
    background-color:#0e1317;
    margin:20px 0px;

    & p.gold{
        color:#b89146 !important;
    };

    & a.readMore{
        margin-top:20px;
        background-color:red;
    }
`



    const image = propInfo?.propertyImage?.image?.url.split('?')[0];
    const imgContainer = css `
    background-image:url(${image});
    height:200px;
    background-size:cover;
`


  return (
    <div css={propContainer}>
        <Grid container>
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
                <div css={imgContainer}></div>
            </Grid>
            <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>  
                <div css={contentMainContainer}>
                    <Grid container>
                        <Grid item xl={10} lg={10} md={9} sm={12} xs={12}>
                            <div css={contentLeftContainer}>
                                <h1>{propInfo.name}</h1>
                                <p>{theDesc}</p>
                                <p className='gold'>{propInfo?.offerBadge?.primary?.text}</p>
                                {propInfo?.reviews?.total>0 && <p>Total Reviews : {propInfo?.reviews?.total}<MdReviews color='#b89146' size={25}/> </p>}
                                {propInfo?.reviews?.score >0 && <p>Score : {propInfo?.reviews?.score}<AiFillStar color='#b89146' size={25}/> </p>}
                            </div>
                        </Grid>
                        <Grid item xl={2} lg={2} md={3} sm={12} xs={12}>
                        <div css={contentRightContainer}>
                            {propInfo.availability?.available === true? <IoCheckmark color='green'/>:<HiOutlineXMark color='red'/>}
                            <p>Rooms Left : {propInfo.availability?.minRoomsLeft}</p>
                            <p><p className='gold'>{propInfo.price?.options[0]?.formattedDisplayPrice}</p>/ Night</p>
                            <a href={`/Amenity/property/${propInfo.id}`} >
                                <p style={{marginTop:"30px"}}> <BiChevronRightSquare color='#b89146'/>BOOK NOW</p>
                            </a>
                        </div>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default SingleResult
