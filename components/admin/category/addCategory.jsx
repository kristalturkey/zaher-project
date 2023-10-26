import React from 'react';
import AdminLayout from '../AdminLayout';
import CategoryForm from './categoryForm';
import { useState } from 'react';
import { db } from '@/functions/firebase';
import { addDoc ,collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuth } from '@/functions/context';
const AddCategoryMain = () => {

    const [title , setTitle] = useState('')
const [image , setImage] = useState({url:'' , name:''})

const {setPageLoading ,pageLoading} = useAuth();

const handleClick = async (e)=>{
    e.preventDefault();
    
    setPageLoading(true)

    const data = {title:title , image:image}

await addDoc(collection(db, 'cats') , data)

    setPageLoading(false)
    toast.success('category Uploaded Successfully')
    setTitle('')
    setImage({name:'' , url :''})

}



    return (
        <AdminLayout>
        
        <CategoryForm
        
        {...{title , setTitle , image , setImage , handleClick}}
        
        />
            
        </AdminLayout>
    );
}

export default AddCategoryMain;
