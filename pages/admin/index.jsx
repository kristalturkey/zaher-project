import React from "react";
import MainAdmin from "@/components/admin/MainAdmin";
import { getCount } from "@/functions/firebase/getData";
const Admin = ({cats}) => {


    console.log('categories Account-->' , cats)

  return (
    <>
      <MainAdmin cats={cats} />
    </>
  );
};

export default Admin;

Admin.getInitialProps = async (context) => {
  const cats = await getCount("cats");

  // const products = await getCount('products')
  // const subcats  =  await getCount('subcats')

  return {
    cats: cats,
    //subcats:subcats,
    //products:products

  };
};
