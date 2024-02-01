// import { React, createContext, useContext, useState, useEffect } from "react";
// import UserForms from "./UserForms";
// import FormP from "../pages/Form";

// const FormDataContext = createContext();

// export const FormDataProvider = () => {
//   const [formDataList, setFormDataList] = useState([]);

//   // Fetch form data from Firebase or wherever you are getting it
//   useEffect(() => {
//     // Fetch and set formDataList
//   }, []);

//   return (
//     <FormDataContext.Provider value={{ formDataList }}>
        
//     </FormDataContext.Provider>
//   );
// };

// // Create a custom hook to use the context
// export const useFormData = () => {
//   const context = useContext(FormDataContext);
//   console.log(context);
//   if (!context) {
//     throw new Error("useFormData must be used within a FormDataProvider");
//   }
//   return context;
// };
