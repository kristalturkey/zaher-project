import React from 'react';
import AdminLayout from '../AdminLayout';
import CategoryTable from './categoryTable';
const CategoriesMain = ({cats}) => {
    return (
        <AdminLayout>


<CategoryTable cats={cats}/>

          
        </AdminLayout>
    );
}

export default CategoriesMain;
