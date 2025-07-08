import React,{useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
    /* b0a9c9bb4ee8de9c553eb84f40f4e3d1 */

    const getMoives = async () => {
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=b0a9c9bb4ee8de9c553eb84f40f4e3d1&language=ko`);
            console.log(response);
        }catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{
        getMoives();
    }, [])
    return (
        <div className='home'>
            <div className="upComin">

            </div>
            <div className="search"></div>

        </div>
    );
};

export default Home;