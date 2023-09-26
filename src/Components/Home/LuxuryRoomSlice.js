import { apiSlice } from "../../store/api/apiSlice";


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        
        getFiltered:builder.mutation({
            query:(body)=>{
                return ({
                url:'/properties/v2/list',
                method:'POST',
                body:body
            })},
        }),
    })
})

export const {
    
    useGetFilteredMutation
} = extendedApiSlice
