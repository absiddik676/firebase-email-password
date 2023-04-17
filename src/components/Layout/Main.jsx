import React from 'react';
import { Outlet } from 'react-router-dom';
import Hader from '../Hader/Hader';

const Main = () => {
    return (
        <div className='w-100 mx-auto'>
            <Hader/>
            <Outlet/>
        </div>
    );
};

export default Main;