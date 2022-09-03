import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='h-screen bg-sky-50'>
      <div className='h-2/3 flex justify-center items-center'>

        <div className='flex flex-col justify-center items-center w-1/4 gap-2 text-sky-800'>
          <img src={logo} alt="Logo" className='w-1/3' />
          
          <h1 className='text-4xl font-semibold'>Onyinye Technologies</h1>
          
          <span className='text-opacity-90 text-center mt-3'>Onyinye is a business that manufactures and delivers Gift-Cards to businesses across Nigeria and Africa.</span>

          <button className='p-3 px-8 rounded-md hover:opacity-90 mt-5 bg-sky-500 text-sky-50'>
            Create a Demo Business
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
