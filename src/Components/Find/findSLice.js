import { apiSlice } from "../../store/api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        
        findLocations:builder.query({
            query:(body)=>{

                // console.log("Loggin the term of the search endPoint")
                // console.log(body)
                return ({
                url:'locations/v3/search',
                method:'GET',
                body:body
            })},
        }),
    })
})

export const {
    useFindLocationsQuery
} = extendedApiSlice
