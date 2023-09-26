import React,{useContext} from 'react'
import './Home.css'
import {BsPlayCircle} from 'react-icons/bs'
import { Modal } from '@mui/material'
import { MediaQueryContext } from '../../Hooks/MediaQueryContext'


function VideoSection() {
    const [open,setOpen] = React.useState(false)
    const handleClick = ()=>{
      setOpen(val=>!val)
    }

    const medias = useContext(MediaQueryContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '40%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        border:'none',
        boxSizing:'border-box',
        outline:'none'
      };

      const iframeStyle = {
        width:medias.DT?"800px":"90%",
        height:medias.DT?"400px":"300px",
        border:"none",
        position:medias.DT?"unset":"relative",
        left:"70px"

      }


  return (
    <div className='videoContainer'>
        <div className='videoContainerContent'>
            <div className='videcoContainerText'>
                <h2>Book hotel rooms, get deals & book flights online.</h2>
            </div>
            <div className='videoContainer-iconContainer'>
             <BsPlayCircle size={130} onClick={handleClick} />
            </div>
            <Modal open={open} onClose={handleClick}>
            <div style={style}>
              <iframe style={{...iframeStyle}} title='video play'
              src="https://www.youtube.com/embed/tgbNymZ7vqY">
              </iframe>
            </div>
            </Modal>
        </div>
    </div>
  )
}

export default VideoSection
