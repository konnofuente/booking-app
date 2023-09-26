import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// https://hotels4.p.rapidapi.com/
// Lets first test with dummyJson

export const apiSlice = createApi({
    reducerPath : 'apiSlice',
    
    baseQuery : fetchBaseQuery({
        baseUrl:'https://hotels4.p.rapidapi.com/',
        // , setting Rapid api keys and headers
        // baseUrl:"https://lol.com",
        
        prepareHeaders:(headers)=>{
            headers.set('content-type','application/json')
            headers.set('X-RapidAPI-Key','1e10034f34msh8d612ecfdae8967p173ec0jsnaaaf135025ae')
            headers.set('X-RapidAPI-Host','hotels4.p.rapidapi.com')
        }
    }),
    endpoints: () => ({})
})
