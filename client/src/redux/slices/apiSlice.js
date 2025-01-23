import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: 'api',  // Unique name for the slice
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5055/api/',  // API base URL 
        prepareHeaders: (headers) => {
         const token = localStorage.getItem('jwtToken'); // Access token from the Redux store
            if (token) {
                headers.set('Authorization', `${token}`);  // Add token to headers
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),  // Empty for now, since we have other slices for specific endpoints
});


export const {} = apiSlice; 
