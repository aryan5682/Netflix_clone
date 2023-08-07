import {configureStore,createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { TMDB_BASE_URL,API_KEY } from "../utils/constants";
import axios from "axios";
import { baseUrl } from "../App";
const initialState={
    movies:[],
    genresLoaded:false,
    genres:[],
};
export const getGenres=createAsyncThunk("netflix/genres" ,async()=>{
const {data:{genres},}= await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

return genres;
});
 const createArrayFromRawData=(array,moviesArray,genres)=>{
//console.log(array);
    array.forEach((movie)=>{
        const moviesGenres=[];
        movie.genre_ids.forEach((genre)=>{
const name=genres?genres.findIndex(({id})=>id===genre):"";
if(name){
    moviesGenres.push(name.name);
}
})
        if(movie.backdrop_path)
            moviesArray.push({
                id:movie.id,
                name:movie?.original_name?movie.original_name:movie.original_title,
                image:movie.backdrop_path,
                genres:moviesGenres.slice(0,3),
            });
        
    });
}
 const getRawData=async (api,genres,paging)=>{
 const moviesArray=[];
 for(let i=1;moviesArray.length<60 && i<10; i++){
    const {data:{results},}=await axios.get(`${api}${paging?`&page=${i}`:""}`
    );
    createArrayFromRawData(results,moviesArray,genres);
 }
 return moviesArray;
};
export const fetchMovies = createAsyncThunk(
    "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return  getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);
// return getRawData(`${TMDB_BASE_URL}/discover/${type}api_key=${API_KEY}&with_genres=${genres}`)
export const fetchDataByGenre = createAsyncThunk(
    "netflix/moviesByGenres",
  async ({ genre, type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return  getRawData(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres,
     
    );
  }
);
export const getUserLikedMovies=createAsyncThunk("netflix/getLiked",async(email)=>{
  const {data:{movies}}=await axios.get(baseUrl + `/api/user/liked/${email}`)
  return movies;
})
export const removeFromLikedMovies=createAsyncThunk("netflix/deleteLiked",async({email,movieId})=>{
  const {data:{movies}}=await axios.put(baseUrl + `/api/user/remove`,{email,movieId})
  return movies;
})

const NetflixSlice =createSlice({
    name:"Netflix",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getGenres.fulfilled,(state,action)=>{
         state.genres=action.payload;
         state.genresLoaded=true;
        });
        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
            state.movies=action.payload;
           });
           builder.addCase(fetchDataByGenre.fulfilled,(state,action)=>{
            state.movies=action.payload;
           });
           builder.addCase(getUserLikedMovies.fulfilled,(state,action)=>{
            state.movies=action.payload;
           });
           builder.addCase(removeFromLikedMovies.fulfilled,(state,action)=>{
            state.movies=action.payload;
           });
    },
});
export const store=configureStore({
    reducer:{
        netflix:NetflixSlice.reducer,
    },
});