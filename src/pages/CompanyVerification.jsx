import { useEffect } from "react";
import LoginLayout from "../components/layout/LoginLayout/LoginLayout";
import CompanyForm from "../components/registration/CompanyForm";

const CompanyVerification = () => {
   
let promise = new Promise((resolve,reject)=>{
    let status = false;
    if(status==true){
        resolve("Done");
    }else{
        reject("cancle");
    }
});

promise.then((result)=>console.log("result",result)).catch((error)=>console.log("error",error));



    return (
         <LoginLayout>
           
            <CompanyForm />
         </LoginLayout>
    );
};

export default CompanyVerification;