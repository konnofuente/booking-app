/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { useContext } from 'react'
import Slider from 'react-slick'
import back2 from '../../assets/pictures/Blog/blog-1.jpg'
import { MediaQueryContext } from '../../Hooks/MediaQueryContext'

const details = [
  {
    picture: "https://konnomelifuente.online/wp-content/uploads/2023/09/konno-meli-fuente.png",
    name: "KONNO MELI Arnaud Desire (Konno Fuente)",
    category: "Frontend Developer (Flutter, Figma, WordPress, HTML, CSS, JS, React JS, Laravel, React Native)",
    details: "Versatile Frontend Developer with expertise in UI/UX design. Proficient in a range of technologies like Flutter, Figma, WordPress, and more. Combines design finesse with technical acumen to create captivating user interfaces. Strong leadership qualities, professional ethics, and a focus on innovation and growth in the IT industry.",
  },
  {
    picture: "https://konnomelifuente.online/wp-content/uploads/2023/09/konno-meli-fuente.png",
    name: "KONNO MELI Arnaud Desire (Konno Fuente)",
    category: "UI/UX Specialist",
    details: "Skilled in creating intuitive and visually appealing user experiences using tools like Figma and Adobe Products. Extremely detail-oriented and committed to crafting user interfaces that not only meet but exceed client expectations.",
  },
  {
    picture: "https://konnomelifuente.online/wp-content/uploads/2023/09/konno-meli-fuente.png",
    name: "KONNO MELI Arnaud Desire (Konno Fuente)",
    category: "Techpreneur",
    details: "Intrinsically motivated to build innovative communities and projects that catalyze exponential growth in the IT industry. Always aims to offer quality work and clean structured solutions while maintaining excellent customer service.",
  }
]




function UserInfo() {
  const medias = useContext(MediaQueryContext)

  const parentDiv = css `
  height: ${medias.SM || medias.BP?"fit-content":"350px"};
  width:100%;
  background-color:#0e1317;
  padding:${medias.DT?"30px":"0px"};
`
const divDotsContainer =css `
 ul{
  display:flex;
  gap:10px;
}
`
const noactiveDot =css `

  border-radius:50%;
  padding:5px;

  div{
    height:7px;
    width:7px;
    border-radius:50%;
    background-color:#b89146;
  }
`
const activeDot = css `
border: 1px solid white;
border-radius:50%;
padding:5px;

div{
  height:7px;
  width:7px;
  border-radius:50%;
  background-color:#b89146;
}

`
const detailDivContainer =css `
  padding:25px;
  display:${medias.SM || medias.BP?"unset":"flex"};
  gap:40px;
`
const detailNameDiv = css `
  font-weight:600;
  color:white;
  margin-bottom:30px;
  text-align:${medias.SM || medias.BP?"center":"left"}
`
const detailTextDiv = css `
  font-weight:500;
  color:white;
  width:${medias.SM || medias.BP?"95%":"60vw"};
  line-height:${medias.SM || medias.BP?"40px":"30px"};
  font-size:${medias.SM || medias.BP?"16px":"20px"};
  text-align:${medias.SM || medias.BP?"center":"left"};
  margin:${medias.SM || medias.BP?"auto":"unset"}
`

  const [currSlide,setCurrSlide] = React.useState(0)

  const settings ={
    dots:true,
    infinite:false,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1,
    arrows:false,
    dotsClass:'theDotClass',
    beforeChange:(prev,next) =>{
      setCurrSlide(next)
    },
    appendDots:dots => {
      return(
        <div css={divDotsContainer}>
        <ul>
          {dots.map((item, index) => {
            return (
              <li key={index}>{item.props.children}</li>
            );
          })}
        </ul>
        </div>
      )
    },
    customPaging: index => {
      return (
        <div css={index === currSlide ? activeDot : noactiveDot}>
          <div></div>
        </div>
      )
    }
  }

  return (
    <div css={parentDiv}>
      <Slider {...settings}  >
        {details.map((detail,index)=>{
          const detailPicDiv =css`
            height:300px;
            width:200px;
            min-width:200px;
            background-image:url(${detail.picture});
            background-size:cover;
            background-position:center;
            background-repeat:no-repeat;
            border-radius:150px;
            margin:${medias.SM || medias.BP?"auto":"unset"};
          `
          return(
            <div key={index}>
              <div css={detailDivContainer}>
                
              <div css ={detailPicDiv}>{/*Picture Here*/}

              </div>
              <div>{/*Details and Slick buttons here*/}
                <div css={detailNameDiv}>
                  <p css={detailTextDiv}>{detail.name}</p>
                  <p className='gold'>{detail.category}</p>
                </div>
                <div css={detailTextDiv}>
                  <p>
                    {detail.details}
                  </p>
                </div>
              </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default UserInfo
