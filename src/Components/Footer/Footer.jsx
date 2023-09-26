import React, { useContext } from 'react'
import './Footer.css'
import {GiMountaintop} from 'react-icons/gi'
import {FaFacebookF,FaInstagram,FaTwitter,FaLinkedin} from 'react-icons/fa'
import {MdLocationPin} from 'react-icons/md'
import {BsFillEnvelopePaperFill,BsFillTelephoneFill} from 'react-icons/bs'
import Button from '../SingleItems/Button/Button'
import { Grid } from '@mui/material'
import { MediaQueryContext } from '../../Hooks/MediaQueryContext'



function Footer() {
  const medias = useContext(MediaQueryContext)
  return (
    <div className='footerDivContainer'>
      <Grid container spacing={1} className='footerFirstSection'>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <div style={{display:'flex',gap:'5px'}}>
          <img src="https://konnomelifuente.online/wp-content/uploads/2023/09/cropped-konnoFuente-logo-type-white-e1693944995879-300x298.png" alt="" />
            <h2 style={{marginTop:'5px',color:"#b89146"}}> KF-TRAVEL</h2>
          </div>
       
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <h2>Information</h2>
          <div className='infoIconsDiv'>
            <p> <MdLocationPin fill='#b89146' size={25}/> OmnisSport, Yaounde </p>
            <p> <BsFillEnvelopePaperFill fill='#b89146' size={25}/>konomelifuente@gmail.com</p>
            <p> <BsFillTelephoneFill fill='#b89146' size={25}/>(+237) 6 90 16 00 47</p>
          </div>
        </Grid>

        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <h2>Social Platform</h2>
          <p>Follow me on this different platform</p>
          <div className='iconsLinksDiv'>    
            <a href=""><FaFacebookF /></a>
            <a href=""><FaInstagram /></a>
            <a href=""><FaTwitter /></a>
            <a href=""><FaLinkedin /></a>
          </div>
        </Grid>

        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <h2>Subscribe</h2>
          <input type="email" placeholder='example@email.com'/>
          <button>SUBSCRIBE</button>
        </Grid>
      </Grid>
      <div className='footerSecondSection'>
          <div>
            <p>Copyright © 2023 <span>Booking</span>  Website by <span>Konno Fuente</span></p>
            <div>
              <a href="">FAQ</a>
              <a href="">Terms Of Use</a>
              <a href="">Privacy Policy</a>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Footer
