import { React, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../config/firebaseConfig";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import{ CloudArrowDown } from "react-bootstrap-icons"

function UserForms (props){
    const {userName}= props

  const [formDataList, setFormDataList] = useState([]);
  
  useEffect(() => { 
      if(userName){
          fetchData();
        } else{
            setFormDataList([]);
        }
    }, [userName]);
    
    const fetchData = async () => {
  try {
    if (userName) {
      const userId = userName.id;
      const formsRef = collection(dataBase, "users", userId, "forms");
      console.log(formsRef);
      const formsSnapshot = await getDocs(formsRef);
      const formsData = formsSnapshot.docs.map((doc) => {
        return {  ...doc.data(), id: doc.id }
      });
      setFormDataList(formsData);
      console.log(formsData);
    //   console.log(formDataList);
    }
  } catch (error) {
    console.error("Error fetching form data:", error);
  }
};
console.log(formDataList);

  const generatePDF = (formData) => {
    const pdf = new jsPDF();
    pdf.text("User Information", 20, 10);

    // Add form data to the PDF
    pdf.text(`Full Name: ${formData.fullName}`, 20, 20);
    pdf.text(`About Me: ${formData.about}`, 20, 30);
    pdf.text(`Phone Number: ${formData.phone}`, 20, 40);
    pdf.text(`Email: ${formData.email}`, 20, 50);
    pdf.text("Work Experience", 20, 60);
    pdf.text(`Company Name: ${formData.companyName}`, 20, 70);
    pdf.text(`Role: ${formData.role}`, 20, 80);
    pdf.text(`Time Frame: ${formData.timeFrame}`, 20, 90);
    pdf.text("Education", 20, 100);
    pdf.text(`What you learn: ${formData.study}`, 20, 110);
    pdf.text(`Time Frame: ${formData.educationTimeFrame}`, 20, 120);

    // Save the PDF or provide a download link
    // You can customize this part based on your preferred approach
    // For simplicity, we'll log a download link in the console
    // const pdfBlob = pdf.output("blob");
    // const pdfDownloadLink = URL.createObjectURL(pdfBlob);
    // console.log("PDF Download Link:", pdfDownloadLink);

    pdf.save("user_information.pdf");
  };

  return (
    <div>
      <h2>User Forms List</h2>
      {formDataList.map((formData) => (
        <div key={formData.id}>
            <h5>{formData.fullName}</h5>
          <Button onClick={() => generatePDF(formData)}>
            Download PDF <CloudArrowDown/>
          </Button>
        </div>
      ))}
    </div>
  );
}

export default UserForms;