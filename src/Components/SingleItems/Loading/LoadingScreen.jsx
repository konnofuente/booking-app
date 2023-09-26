/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import { CircularProgress } from '@mui/material'
import React, { useContext } from 'react'
import { MediaQueryContext } from '../../../Hooks/MediaQueryContext'




function LoadingScreen() {
    const medias = useContext(MediaQueryContext);

const loadingContainer = css `
    width:100px;
    margin:auto;
    padding-top:${medias.DT || medias.TB? "300px":"40vh"};
`
  return (
    <div style={{backgroundColor:"#0e1317",height:"100vh"}}>
        <div css={loadingContainer}>
        <CircularProgress size={50} style={{color:"white"}}/>
        </div>
    </div>
  )
}

export default LoadingScreen
