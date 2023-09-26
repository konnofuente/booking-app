/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import React, { useState,useEffect, useContext } from 'react'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import './Home.css'
import { useGetFilteredMutation } from './LuxuryRoomSlice'
import LuxurySingleRoom from '../SingleItems/LuxuryRoom/LuxurySingleRoom'
import Loading,{Error} from '../SingleItems/Loading/Loading'
import { MediaQueryContext } from '../../Hooks/MediaQueryContext'
import { LocationContext } from '../../Hooks/LocationContext'
import axios from 'axios'


const curerrentDate = new Date()

const RenderRooms =({roomList,allRooms,setRooms,setglobalRooms,globalRooms})=>{
  useEffect(()=>{
    setglobalRooms(roomList)
    setRooms(globalRooms.slice(0,4))
  },[])

  useEffect(()=>{
    setRooms(globalRooms.slice(0,4))
  },[globalRooms])

  return(
        <div>
          <TransitionGroup className='theGroup'>
        {allRooms.map((room,index)=>{
          return(
            <CSSTransition key={index} timeout={300} classNames="item">
              <LuxurySingleRoom room={room} />
            </CSSTransition>
          )
        })}
        </TransitionGroup>

        </div>
  )
  
}

function LuxuryRooms() {
    const media = useContext(MediaQueryContext)
    const roomTypes = ['Popular','Luxory','Suites','Family']
    const [fetchData,{data,status,error,isLoading,isError,isSuccess}] = useGetFilteredMutation()
    const [roomType,setRoomType] = useState(roomTypes[0])
    const [allRooms,setRooms] = useState([]);
    const [globalRooms,setglobalRooms] = useState([]);
    const usermetaData = useContext(LocationContext)
    const [currGid,setCurrcurrGid] = useState(null)
    
    const currCountry = usermetaData[3]
    
    const hotelTypeBody = {
      currency: "USD",
      // eapid: 1,
      locale: "en_US",
      // siteId: 300000001,
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


    const typeStyle = css`
      display:${media.DT?'flex':'grid'};
      justify-content:space-between;
      grid-template-columns:${media.TB?'1fr 1fr 1fr 1fr 1fr':media.BP?'1fr 1fr 1fr 1fr':'1fr 1fr 1fr'};
      width:${media.DT?'auto':'fit-content'};
      margin:${media.DT?'unset':'auto'};
    `

    const parentContainer = css `
      display:${media.DT?'flex':'block'};
      justify-content:space-between;
    `

    const handleRoomChange =(e)=>{
      let selectedType = e.target.innerText
      setRoomType(selectedType)
      
    }

    useEffect(()=>{
      let isUnfetched = true;

      if(currGid == null){
        return ()=>{
          isUnfetched = false;
        }
      }
      fetchData(hotelTypeBody)

      return ()=>{
        isUnfetched = false;
      }
    },[currGid])

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
          const response = await axios.request(options);
          setCurrcurrGid(response.data.sr[0].gaiaId)
        } catch (err) {
          console.error(err);
        }
      })();
      return()=>{
        isUnfetched = false;
      }
    },[])


    useEffect(()=>{
      const abortSignal = new AbortController()

      switch(roomType){
        case('Popular'):
        setRooms(globalRooms.slice(0,4))
          break;

        case('Luxory'):
        setRooms(globalRooms.slice(3,6))
          break;

        case('Suites'):
        setRooms(globalRooms.slice(2,5))
          break;

        case('Family'):
        setRooms(globalRooms.slice(4,9))
         break;

        case('Single'):
        setRooms(globalRooms.slice(9,globalRooms.length))
        break;

        default:
        setRooms(globalRooms.slice(3,6));
        break;
        
      }
      return () => {
        abortSignal.abort()
      }
    },[roomType])

    let content

    if(isLoading){
      content = <Loading />
    }
    else if (isError){
      content = <Error/>
    } else if(isSuccess){
      console.log(data)
      if(data && data!=null && data?.data?.propertySearch?.properties.length > 0 ){
        const criteriaResults =  data.data.propertySearch.properties;        
        content = <RenderRooms 
                        roomList={criteriaResults} 
                        allRooms={allRooms} 
                        setRooms={setRooms} 
                        globalRooms={globalRooms} 
                        setglobalRooms={setglobalRooms}/>

      }
      else content = <Error/>
    }

  return (
  <div>
      <div css={parentContainer}>
        <div>
          <div className='tex3t-div' style={{textAlign:media.DT?'unset':'center'}}>
          <p className='small gold'>Deluxe And Luxury</p>
          <h2>Our Luxury Rooms</h2>
          </div>
        </div>
        <div css={typeStyle}>
          {
          roomTypes.map((room,index)=>(
          <div key={index} onClick={handleRoomChange} className={room===roomType?'luxury-room-type type-active':'luxury-room-type'}>
            <p>{room}</p>
            <div></div>
          </div>
          ))}
        </div>
      </div>
      <div >
        <p>{roomType}</p>
          {content}
      </div>

  </div>
  )
  
}



export default LuxuryRooms
