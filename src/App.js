import "./App.css";
import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  

  const [name,setName] = useState(null);
  const [age,setAge] = useState(null);
  const [address,setAddress] = useState(null)
  const [imgUrl,setImgUrl]=useState(null);
  const [pdfUrl,setPdfUrl]=useState(null);
  const [phoneNo,setPhoneNo]=useState(null);
  const [email,setEmail]=useState(null);

  const [image,setImage]=useState(null);
  const [isPending,setIsPending]=useState(false);
  const [error,setError]=useState(false);
  const [errMsg,setErrMsg]=useState('')



  const [data, setData] = useState({
    name: "",
    age: "",
    address: "",
    img:imgUrl,
    phone:'',
    email:'',
  });
  const changeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandlerSheet = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post(
        "https://sheet.best/api/sheets/e9a48439-26c6-4aed-b144-2b83464e8672",
        {data,imgUrl}
      )
      .then((res) => console.log(res));
  };

  const ImageUpload=(data)=>{
    console.log(data,'data')
    setIsPending(true);
    setImage(data);
    const formData=new FormData();
      formData.append("file",data);
      formData.append("upload_preset","azure_career");
      formData.append("folder","photo")
      formData.append("public_id",data.name)
      axios.post("https://api.cloudinary.com/v1_1/dcmztntur/image/upload/",formData)
      .then(res=>{
        setImgUrl(res.data.url)
    }).then(()=>{setIsPending(false)}).catch(err=>{
      setErrMsg(err.message);
      setError(true);
      setIsPending(false)
    })
  }
  // const PdfUpload=(data)=>{
  //   console.log(data,'data')
  //   setIsPending(true);
  //   const formData=new FormData();
  //     formData.append("file",data);
  //     formData.append("upload_preset","azure_career");
  //     formData.append("folder","pdf")
  //     formData.append("public_id",data.name)
  //     axios.post("https://api.cloudinary.com/v1_1/dcmztntur/image/upload/",formData)
  //     .then(res=>{
  //       setPdfUrl(res.data.url)
  //   }).then(()=>{setIsPending(false)}).catch(err=>{
  //     console.log(err,'error');
  //     setErrMsg(err.message);
  //     setError(true);
  //     setIsPending(false)
  //   })
  // }
  const PdfUpload = (e)=>{
      setIsPending(true);
      var file = e.target.files[0] //the file
      var reader = new FileReader() //this for convert to Base64 
      reader.readAsDataURL(e.target.files[0]) //start conversion...
      reader.onload = function (e) { //.. once finished..
        var rawLog = reader.result.split(',')[1]; //extract only thee file data part
        var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
        fetch('https://script.google.com/macros/s/AKfycbzW_s7I8kH6j4V19wmPI3J7BchQmVytb_0zqOaNJAQ2EdKB5DlUoIOtOl_G6uWxNuuJhQ/exec', //your AppsScript URL
          { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
          .then(res => res.json()).then((a) => {
            console.log(a)
            setPdfUrl(a) //See response
            setIsPending(false)
          }).catch(e => {
            setErrMsg(e)
            setIsPending(false)
            console.log(e)}) // Or Error in console
      
    }
  }
//   const ImageUpload = (e)=>{
//     var file = e.target.files[0] //the file
//     var reader = new FileReader() //this for convert to Base64 
//     reader.readAsDataURL(e.target.files[0]) //start conversion...
//     reader.onload = function (e) { //.. once finished..
//       var rawLog = reader.result.split(',')[1]; //extract only thee file data part
//       var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
//       fetch('https://script.google.com/macros/s/AKfycbxu-1wyiW96S291l3VKk3rOpGhmNwST9VAzt3arrRyzUih56MiVVMJvm_QH426bdP9vrg/exec', //your AppsScript URL
//         { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
//         .then(res => res.json()).then((a) => {
//           console.log(a)
//           setImgUrl(a) //See response
//         }).catch(e => console.log(e)) // Or Error in console
    
//   }
// }
  // const submitHandler = (e) => {
  //     e.preventDefault();
  //     console.log({name,age,address,imgUrl,phoneNo,email});
  //     axios.post("http://localhost:3000/data",{name,age,address,imgUrl,phoneNo,email,pdfUrl})
  // }
  return (
    <div className="App">
      <h1>Fill this form to join AZURE family</h1>
      <form onSubmit={(e) => submitHandlerSheet(e)}>
        <input
          type="text"
          name="name"
          placeholder="enter your name"
          onChange={(e) => changeHandler(e)}
        ></input>
        <input
          type="number"
          name="age"
          placeholder="enter your age"
          onChange={(e) => changeHandler(e)}
        ></input>
        <input
          type="text"
          name="address"
          placeholder="enter your address"
          onChange={(e) => changeHandler(e)}
        ></input>
        <input
          type="text"
          name="phone"
          placeholder="enter your phone"
          onChange={(e) => changeHandler(e)}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="enter your email"
          onChange={(e) => changeHandler(e)}
        ></input>
        <input type={'file'} onChange={(e)=>ImageUpload(e.target.files[0])}></input>
        <input type={'file'} onChange={(e)=>PdfUpload(e)}></input>
        <input disabled={isPending?true:false} type={"submit"}></input>
      </form>
      {isPending&&<div>loading...</div>}
      {error&&<div>{errMsg}</div>}
    </div>
  );
}

export default App;
