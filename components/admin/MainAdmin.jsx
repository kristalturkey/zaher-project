import React from 'react';
import AdminLayout from './AdminLayout';
import CountCard from './CountCards';

const MainAdmin = ({cats}) => {
    return (
        <AdminLayout>

<CountCard  
cats={cats}
/>


        
        </AdminLayout>
    );
}

export default MainAdmin;
