import React from 'react';
import './Home.css';
import Boxes from '../component/Boxes';

const Home = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center h-[600px] bg-purple-800'>
      <div className='text-white text-middle font-bold text-5xl animate__animated animate__fadeInUp mb-8'>
        <p className='text-center py-5'>BLAZEKARO</p>
        <p className='text-center py-5 text-3xl'>WE DELIVER THE BEST ACCORDING TO YOUR NEED</p>
      </div>
    </div>
    <Boxes/>
    </>
  );
}

export default Home;
