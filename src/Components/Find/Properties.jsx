/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import { Grid,Skeleton } from '@mui/material';
import React, { useEffect } from 'react'
import { animateScroll as scroll } from 'react-scroll';
import Loading from '../SingleItems/Loading/Loading';
import SingleResult from './SingleResult';

const adjectives = ['luxurious', 'elegant', 'modern', 'cozy', 'trendy', 'chic', 'spacious', 'stylish'];
const locations = ['in the heart of the city', 'near the beach', 'with stunning mountain views', 'amidst lush greenery'];
const amenities = ['free WiFi', '24-hour room service', 'outdoor pool', 'fitness center', 'on-site restaurant'];

function generateDescription() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const amenity1 = amenities[Math.floor(Math.random() * amenities.length)];
  const amenity2 = amenities[Math.floor(Math.random() * amenities.length)];
  
  return `Experience a ${adjective} stay at our hotel ${location}, complete with ${amenity1} and ${amenity2}.`;
}


function paginateArray(array, itemsPerPage) {
    // Determine the number of pages based on the array length and items per page
    const numPages = Math.ceil(array.length / itemsPerPage);
  
    // Create an empty array to hold the paginated sub-arrays
    const paginatedArray = [];
  
    // Loop through each page and slice the original array into sub-arrays of the desired size
    for (let i = 0; i < numPages; i++) {
      const startIndex = i * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      paginatedArray.push(array.slice(startIndex, endIndex));
    }
    
    // Return both the paginated array and the number of pages
    return paginatedArray;

  }

function Properties({properties=[]}) {


    const allItems = paginateArray(properties,10)
    const pages = allItems.length;
    const [isLoading,setIsLoading] = React.useState(false)
    const [currPage,setCurrPage] = React.useState(0)
    const displayPages =[];

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },3000)
    },[isLoading])

    for (let i = 1; i < pages; i++) {
        displayPages.push(i)
        console.log(allItems[19])
    }
    console.log(pages)
    const paginationSingle = css `
        color:#b89146;
        padding:5px;
        background-color:#0e1317;
        font-weight:700;
        text-align:center;
        font-size:25px;
        width:100px;
        max-width:100px;
        margin:0px auto;
        cursor:pointer;
    `
    const paginationContainer = css `
        padding:20px;
        border:1px solid #E7E7E8;
        width:fit-content;
        margin-top:30px;
    `
let content
if(isLoading){
    content = <Skeleton variant="rectangular" width="100%" height={118} />
}else if(!isLoading){
content = <div>
    {allItems[currPage].map((prop,index)=>{
    return(
        <SingleResult propInfo={prop} key={index} desc={generateDescription()}/>
    )
})}
</div>
}

  return (
    <div id="400">
        
    {content}
    <Grid container gap={2} css={paginationContainer}>
        {displayPages.map((page,index)=>{
            return(
                    <Grid item xl={1} lg={1} md={2} sm={2} xs ={3} 
                    css={paginationSingle} onClick={()=>{
                            setCurrPage(page)
                            scroll.scrollTo(400)
                            setIsLoading(true)
                    }} style={currPage === page?{color:"white"}:{}}>
                        {page}
                    </Grid>
            )
        })}
    </Grid>
</div>
  )
}

export default Properties
