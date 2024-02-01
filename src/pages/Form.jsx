import {React, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {PlusCircle} from 'react-bootstrap-icons'
import jsPDF from 'jspdf';
import { getAuth } from "firebase/auth";
import {collection,addDoc,serverTimestamp,doc,getDoc, setDoc} from "firebase/firestore";
import { dataBase } from "../config/firebaseConfig";


function FormP (props){
    const { userName }= props;
    const formsCollectionRef = collection(dataBase, "forms");

    const [formData, setFormData] = useState({
        firstName: "",
        about: "",
        phone: "",
        email: "",
        companyName: "",
        role: "",
        workTimeFrame: "",
        study: "",
        educationTimeFrame: ""
      });

      const auth = getAuth();
    
    // const pdfRef = useRef();

    const generatePDF = async(e) => {
        e.preventDefault();

        // console.log("Button clicked, generating PDF...");
        // console.log(formData.fullName);

        const pdf = new jsPDF();
        pdf.text("User Information", 20, 10);
    
        // Get input values and add them to the PDF
        pdf.text(`Full Name: ${formData.fullName}`, 20, 20);
        pdf.text(`About Me: ${formData.about}`, 20, 30);
        pdf.text(`Phone Number: ${formData.phone}`, 20, 40);
        pdf.text(`Email: ${formData.email}`, 20, 50);
    
        // Add Work Experience
        pdf.text("Work Experience", 20, 60);
        pdf.text(`Company Name: ${formData.companyName}`, 20, 70);
        pdf.text(`Role: ${formData.role}`, 20, 80);
        pdf.text(`Time Frame: ${formData.timeFrame}`, 20, 90);
    
        // Add Education
        pdf.text("Education", 20, 100);
        pdf.text(`What you learn: ${formData.study}`, 20, 110);
        pdf.text(`Time Frame: ${formData.educationTimeFrame}`, 20, 120);

        // if (userName) {
        // try {
        //       const userId = userName.id;

        //       const formDoc = await addDoc( formsCollectionRef, {
        //         ...formData,
        //           timestamp: serverTimestamp(),
        //           userId:userId
        //       })
        //       console.log(formDoc);

        //       const formRef = doc(dataBase, "forms", formDoc.id);
        //         console.log(formRef);
        //         const newDoc = await getDoc(formRef);
        //         setFormData([...formDoc,{...newDoc.data(), id:newDoc.id }]);
        //         console.log(formDoc);

        //     }catch(error){
        //         console.error("Error saving favorite coins:", error);
        //     };
        // }
      
      try{
              // Check if the document already exists
              const userId = userName.id;
              const userDocRef = doc(dataBase, "users", userId);
              const userDocSnap = await getDoc(userDocRef);
      
              if (userDocSnap.exists()) {
                // Update existing document
                await addDoc(collection(dataBase, "users", userId, "forms"), {
                  ...formData,
                  timestamp: serverTimestamp(),
                });
              } else {
                // Create new document
                await setDoc(userDocRef, {
                  forms: [
                    {
                      ...formData,
                      timestamp: serverTimestamp(),
                    },
                  ],
                });
              console.log("Form data saved to Firestore");
              }
              } catch (error) {
            console.error("Error saving form data to Firestore:", error);
          }
      
    
        pdf.save("user_information.pdf");
      };

      const handleChange = (e) => {
        console.log("hi");
        const { name, value } = e.target;
        setFormData((formData) => ({ ...formData, [name]: value }));
        console.log(formData);
      };
    
    
    return (
            <Form id="PDFForm" name='email' onSubmit={generatePDF}>
            <h2>Lets Build Your Story ...</h2>
            <Row>
                <Col>
                <Form.Control name="fullName" onChange={handleChange}
                 placeholder="Full name" />
                </Col>
                </Row><br></br>
                <Row>
                <Col>
                <Form.Control as="textarea"  rows={3} name="about" onChange={handleChange}
                 placeholder="About Me" />
                </Col>
                </Row><br></br>
                <Row>
                <Col>
                <Form.Control name="phone" onChange={handleChange}
                placeholder="Phone Number" />
                </Col>
                </Row><br></br>
                <Row>
                <Col>
                <Form.Control name="email" onChange={handleChange}
                placeholder="Email" />
                </Col>
                </Row><br></br>

                <h5>Work Experience:</h5><br></br>
                <Col>
                <Form.Control name="companyName" onChange={handleChange}
                placeholder="Company Name" />
                </Col><br></br>
                <Col>
                <Form.Control name="role" onChange={handleChange}
                placeholder="Role" />
                </Col><br></br>
                <Col>
                <Form.Control name="timeFrame" onChange={handleChange}
                placeholder="Time Frame" />
                </Col><br></br>
                <Button variant="regular">Add Experience <PlusCircle/></Button><br></br>

                <h5>Education:</h5>
                <Col>
                <Form.Control name="study" onChange={handleChange}
                placeholder="what you learn" />
                </Col><br></br>
                <Col>
                <Form.Control name="educationTimeFrame" onChange={handleChange}
                placeholder="Time Frame" />
                </Col><br></br>
                <Button variant="regular">Add Education <PlusCircle/></Button><br></br>
                

            <Button variant="primary" type="submit">
                Submit
            </Button>
    </Form>
    )
}

export default FormP;