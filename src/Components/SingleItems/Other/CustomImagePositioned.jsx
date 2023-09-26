import React, { useContext } from 'react'
import { MediaQueryContext } from '../../../Hooks/MediaQueryContext'



function CustomImagePositioned({image,top,left,bottom,right,height,width}) {

  const medias = useContext(MediaQueryContext)

    const style={
        position:'absolute',
        height:`${height}`,
        width:`${width}`,
        backgroundImage:`url(${image})`,
        top:`${top}`,
        left:medias.TB?"0px":`${left}`,
        right:medias.TB?"0px":`${right}`,
        bottom:`${bottom}`,
        backgroundSize:'contain',
        backgroundRepeat:'no-repeat',
        marginLeft:"auto",
        marginRight:"auto"

    }

  return (
    <div style={{...style}}>

    </div>
  )
}

export default CustomImagePositioned
