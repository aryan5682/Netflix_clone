import React from 'react'
import CarSlider from './CarSlider'

export default React.memo(function Slider({movies}) {
    const getMoviesFromRange=(from,to)=>{
        return movies.slice(from,to)
    }
  return (
    <div>
      <CarSlider title="Trending Now" data={getMoviesFromRange(0,10)}/>
      <CarSlider title="New Releases" data={getMoviesFromRange(10,20)}/>
      <CarSlider title="BlockBuster Movies" data={getMoviesFromRange(20,30)}/>
      <CarSlider title="Popular on Netflix" data={getMoviesFromRange(30,40)}/>
      <CarSlider title="Action Movies" data={getMoviesFromRange(40,50)}/>
      <CarSlider title="Epics" data={getMoviesFromRange(50,60)}/>
    </div>
  )
}
)
