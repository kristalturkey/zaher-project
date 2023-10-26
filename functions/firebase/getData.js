import {
  DocumentData,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  limit,
} from "firebase/firestore";
import { db, storage } from "./index";
import { ref, deleteObject } from "firebase/storage";

//step-1- get number of documents in one Collection
export const getCount = async (col) => {
  //col --> {products , categories , subcategories}
  const colRef = collection(db, col);
  const snapshot = await getCountFromServer(colRef);
  return snapshot.data().count;
};

function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    id: doc.id,
    // createdAt: data.createdAt..... === true or  false

    // createdAt: data.createdAt?.toMillis() || 0,
    // updatedAt: data.updatedAt?.toMillis() || 0,
  };
}

// query and limmit is params
export const getDocuments = async (col, querydata = null, limit = null) => {
  const queryConstraints = [];

  // query here is value from function {price === 200} or {name === adidas} ....
  if (querydata !== null) queryConstraints.push(where(...querydata));
  // limit  is number of data to get  from firestore  8  10 11 ....
  if (limit !== null) queryConstraints.push(limit(limit));

  // where(..) , where(''') , where ....
  const ref = collection(db, col);
  // query here is method from firebase to filter data
  const docsRef = query(ref, ...queryConstraints);

  //  if query params is exist and limit is exist  filter data else show all data from collection
  const documents = (await getDocs(docsRef)).docs.map(postToJSON);

  return documents; //  [] array of data named categories , products  , subcategories in /admin/.../all
};
