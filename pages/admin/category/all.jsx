import React from "react";
import CategoriesMain from "@/components/admin/category/Categories";
import { getDocuments } from "@/functions/firebase/getData";

// clientside
const All = ({ cats }) => {
  return (
    <div>
      <CategoriesMain cats={cats} />
    </div>
  );
};

export default All;

// serverside
All.getInitialProps = async (context) => {
  const Categories = await getDocuments("cats"); //  []

  console.log("data", Categories);

  return {
    // props from serverside will go to props in clientside
    cats: Categories,
  };
};
