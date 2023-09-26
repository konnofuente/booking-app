/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { css } from '@emotion/react'
import {MdWifiPassword} from 'react-icons/md'
import {TbMapSearch} from 'react-icons/tb'
import {GiMagicBroom} from 'react-icons/gi'
import { MediaQueryContext } from '../../Hooks/MediaQueryContext'
import { useContext } from 'react'
import { Grid } from '@mui/material'

const amenities = [
    {
        name:"Room Cleaning",
        icon:<GiMagicBroom size={35} color='#b89146'/>,
        description:"All hotels listed on our platform are committed to providing guests with a clean and healthy environment."
    },
    {
        name:"Room Wifi",
        icon:<MdWifiPassword size={35} color='#b89146'/>,
        description:"Staying connected is important, Get deals with hotels that offer free and high speed internet connection"
    },
    {
        name:"Pickup & Drop",
        icon:<TbMapSearch size={35} color='#b89146'/>,
        description:"We've partnered with top hotels that provide convenient pickup and drop-off services for their guests."
    }
]

function RoomAmenities() {
    const medias = useContext(MediaQueryContext)

    const parentContainer = css `
        display:flex;
        justify-content:space-between;
        
    `

    const styles = css`
    margin:${medias.TB || medias.BP || medias.SM?"15px 0px":"0px"};
    display:flex;
    gap:20px;
    width:350px;
    

    h4{
        line-height:25px;
        font-size:20px;
        color:#333334;
    }
    p{
        line-height:26px;
        color:#333334;
        width:${medias.TB || medias.BP || medias.SM?"97%":"100%"};
    }
    .ammenityIcon{
        display:flex;
        justify-content:space-around;
        align-items:center;
        width:${medias.TB || medias.BP || medias.SM?"120px":"200px"};
        height:${medias.TB || medias.BP || medias.SM?"100%":"100%"};
        border-radius:5%;
        background-color:#eeeeee;
        
    }
`

  return (
    // <div css={parentContainer}>
    <Grid container css={parentContainer}>
        {amenities.map((amenitiy,index)=>{
            return(
                // <div css={styles} key={index}>
                <Grid item xs={12} md={4} lg={4}  css={styles} key={index}> 
                    <div className='ammenityIcon'>
                        {amenitiy.icon}
                    </div>
                    <div>
                        <h4>{amenitiy.name}</h4>
                        <p>{amenitiy.description}</p>
                    </div>
                    </Grid>
                )
                {/* </div> */}
        })}
        </Grid>
    // </div>
  )
}

export default RoomAmenities
