/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import React,{useState,useEffect,useContext} from 'react'
import { useGetFilteredMutation } from '../Home/LuxuryRoomSlice'
import axios from 'axios'
import { LocationContext } from '../../Hooks/LocationContext'
import LoadingScreen from '../SingleItems/Loading/LoadingScreen'
import Loading, { Error } from '../SingleItems/Loading/Loading'
import { MediaQueryContext } from '../../Hooks/MediaQueryContext'
import bacPick from '../../assets/pictures/page-banner-6.jpg'
import SingleProperty from './SingleProperty'
import { Grid } from '@mui/material'


const curerrentDate = new Date()

const RenderRooms =({roomList})=>{
  console.log(roomList)
  const [results,setResults] = useState(roomList)
  return(
    <div>
      <Grid container>
     {results && results.length > 0 && results.map((room,index)=>{
         return(
           <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
               <SingleProperty key={index} property={room}/>
           </Grid>
         )
     })}
     
    </Grid>
    </div>
  )
}


function AroundMe() {
  let content;
  const medias = useContext(MediaQueryContext)
  const [currGid,setCurrcurrGid] = useState(null)
  const [fetchData,{data,status,error,isLoading,isError,isSuccess,isUninitialized}] = useGetFilteredMutation()
  const usermetaData = useContext(LocationContext)

  const currCountry = usermetaData[3]

    const hotelTypeBody = {
      currency: "USD",
      locale: "en_US",
      destination: {
        regionId: currGid
    },
      checkInDate: {
        day: curerrentDate.getDate(),
        month: curerrentDate.getMonth() + 1,
        year: curerrentDate.getFullYear()
      },
      checkOutDate: {
        day: curerrentDate.getDate() + 2,
        month: curerrentDate.getMonth() + 1,
        year: curerrentDate.getFullYear()
      },
      rooms: [
          {
              adults: 2,
              children: [
                  {
                      age: 5
                  },
                  {
                      age: 7
                  }
              ]
          }
      ],
      resultsStartingIndex: 0,
      resultsSize: 200,
      sort: "PRICE_LOW_TO_HIGH"
    }

    useEffect(() => {
      let isUnfetched = true;

      const shouldFetchData = currGid !== null && !localStorage.getItem("properties");

      shouldFetchData && fetchData(hotelTypeBody);

      return () => {
        isUnfetched = false;
      };
    }, [currGid]);


        useEffect( ()=>{
      let isUnfetched = true;
      {/***************************/}
      const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v3/search',
        params: {q: currCountry},
        headers: {
          'X-RapidAPI-Key': '7d266fe8e5mshaa6c100f384b6efp1fea46jsn72d95cb12846',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
      };

      (async () => {
        try {
          if(localStorage.getItem("userGid")){
            setCurrcurrGid(localStorage.getItem("userGid"))
          }else{
            const response = await axios.request(options);
            setCurrcurrGid(response.data.sr[0].gaiaId)
            localStorage.setItem("userGid",response.data.sr[0].gaiaId)
          }
        } catch (err) {
          console.error(err);
        }
      })();
      return()=>{
        isUnfetched = false;
      }
    },[])

  
  const picHeader = css`
  background-image:url(${bacPick});
  height:400px;
  background-position:center;

  & h1{
    text-align:center;
    font-size:45px;
    color:white;
    font-weight:500;
  }

  &::after{
    content:'';
    width:100%;
    height:400px;
    position:absolute;
    left:0px;
    right:0px;
    background-color:#0E1317;
    opacity:0.8;
  }
`
const picContent = css`
z-index:100;
left:0px;
right:0px;
margin:230px auto;
width:fit-content;
position:absolute;
color:white;
display:flex;
flex-direction:column;
align-items:center;
gap:10px;
`

const contentContainer = css `
  margin:${medias.DT || medias.TB? "100px 50px": "10px"};
`
if (localStorage.getItem("properties")) {
  const locStorageData = JSON.parse(localStorage.getItem("properties"));
  content = <RenderRooms roomList={locStorageData} />;
} else if (isUninitialized || isLoading) {
  content = <Loading />;
} else if (isError) {
  content = <Error />;
} else if (isSuccess && data?.data?.propertySearch?.properties?.length > 0) {
  const propertyList = data.data.propertySearch.properties;
  localStorage.setItem("properties", JSON.stringify(propertyList));
  content = <RenderRooms roomList={propertyList} />;
}

console.log(isUninitialized);
// console.log(error);

  return (
    <div>
    <div css={picHeader}>
      <div css={picContent}>
        <h1>Hotels around you</h1>
      </div>
    </div>
    <div css={contentContainer}>
      {content}
    </div>
</div>
  )
}

export default AroundMe


