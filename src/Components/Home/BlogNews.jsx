/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { useContext } from 'react'
import back2 from '../../assets/pictures/Blog/blog-1.jpg'
import back3 from '../../assets/pictures/Blog/blog-2.jpg'
import back1 from '../../assets/pictures/Blog/blog-3.jpg'
import { Collapse } from '@mui/material'
import Button from '../SingleItems/Button/Button'
import { MediaQueryContext } from '../../Hooks/MediaQueryContext'
import { useMediaQuery } from 'react-responsive'

const currDate = new Date().toLocaleDateString()

const data = [
  {date:currDate,picture:back1,details:"The ultimate guide to finding hotels in your area"},
  {date:currDate,picture:back2,details:"Book a room today at most affordable rates"},
  {date:currDate,picture:back3,details:"WeMove is the best choice for hotel booking"}
]

const parentDiv = css `
    & p,h1{
        margin-bottom:15px;
    }
`



const SingleItem =({itemDetails})=>{
  const sBug = useMediaQuery({ minWidth: 1024, maxWidth:1316 });
  const medias = useContext(MediaQueryContext)
  const [mouseIn,setMouseIn] = React.useState(false);
  const picDiv = css `
    height:193px;
    width:${medias.SM || sBug?"300px":medias.BP?"350px":medias.TB?"350px":medias.DT?"350px":"350px"};
    background-image:url(${itemDetails.picture});
    background-repeat:no-repeat;
    background-position:center;
  `
  const dataFlexDiv = css `
  background-color:white;
  padding:20px;
  border:1px solid #EDECE7;
  width:255px;
  
  margin:auto;
  margin-top:-10%;
  `

const divButton =css `
  margin-top:20px;
`
const divDate =css `
  border-bottom:1px solid #EDECE7;
  height:fit-content;
  padding:10px 0px;
`
const divText =css `
  width:180px;

  & .black{
    height:60px;
  }
`

const parentDIv = css `
  width:fit-content;
  margin:${medias.DT?'0px':'30px 0px'};
`

  return(
    <div css={parentDIv}>
      <div css={picDiv} 
      className='pic-zoom-anim' 
      onMouseEnter={()=>setMouseIn(true)} 
      onMouseLeave={()=>setMouseIn(false)}
      ></div>
      
      <Collapse 
      in={mouseIn} 
      timeout={600}
      collapsedSize={45}
      css={dataFlexDiv}
      onMouseEnter={()=>setMouseIn(true)} 
      onMouseLeave={()=>setMouseIn(false)}
      >
        <div style={{display:'flex',gap:'20px',height:'100px'}}>
        <div css={divDate}>{/*Date Div*/}
          <p className='black'>{itemDetails.date}</p>
        </div>
        <div css={divText}>{/*Data Div*/}
          <p className='black'>{itemDetails.details}</p>
          <div css={divButton}>
            <Button text='READ MORE' from='white' textTo='#0e1317' textFrom='#0e1317' small/>
          </div>
        </div>
        </div>
      </Collapse>
    </div>
  )
}

function BlogNews() {
  
  const medias = useContext(MediaQueryContext)
  return (
    <div style={{height:'fit-content'}}>
        <div className='text-center tex3t-div' css={parentDiv}>
            <p className='gold'>Our Blog</p>
            <h2>Read Our Blog And News</h2>
        </div>
        <div>
          <div style={
            medias.DT?{display:'flex',justifyContent:'space-around'}:
            medias.SM || medias.BP?{width:'fit-content',margin:'0px auto'}:
            medias.TB ?{display:'grid',gridTemplateColumns:'1fr 1fr'}:{}
            }>
              {data.map((item,index)=>{
                return(
                  <SingleItem itemDetails={item} key={index}/>
                )
              })}
          </div>
        </div>
    </div>
  )
}

export default BlogNews
