import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  // const [data, setData] = useState({
  //   name: "",
  //   age: "",
  //   address: "",
  //   img:imgUrl
  // });
  // const changeHandler = (e) => {
  //   setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(data);
  //   axios
  //     .post(
  //       "https://sheet.best/api/sheets/e9a48439-26c6-4aed-b144-2b83464e8672",
  //       data
  //     )
  //     .then((res) => console.log(res));
  // };



  const [name,setName] = useState(null);
  const [age,setAge] = useState(null);
  const [address,setAddress] = useState(null)
  const [imgUrl,setImgUrl]=useState(null);
  const [phoneNo,setPhoneNo]=useState(null);
  const [email,setEmail]=useState(null);


  const [image,setImage]=useState(null);
  const [isPending,setIsPending]=useState(false);
  const [error,setError]=useState(false);
  const [errMsg,setErrMsg]=useState('')

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
  const PdfUpload=(data)=>{
    console.log(data,'data')
    setIsPending(true);
    setImage(data);
    const formData=new FormData();
      formData.append("file",data);
      formData.append("upload_preset","azure_career");
      formData.append("folder","pdf")
      formData.append("public_id",data.name)
      axios.post("https://api.cloudinary.com/v1_1/dcmztntur/image/upload/",formData)
      .then(res=>{
        setImgUrl(res.data.url)
    }).then(()=>{setIsPending(false)}).catch(err=>{
      console.log(err,'erer');
      setErrMsg(err.message);
      setError(true);
      setIsPending(false)
    })
  }

  const submitHandler = (e) => {
      e.preventDefault();
      console.log({name,age,address,imgUrl,phoneNo,email});
      axios.post("http://localhost:3000/data",{name,age,address,imgUrl,phoneNo,email})
  }
  return (
    <div className="App">
      <form onSubmit={(e) => submitHandler(e)}>
      {/* <form> */}
        <input
          type="text"
          name="name"
          placeholder="enter your name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="number"
          name="age"
          placeholder="enter your age"
          onChange={(e) => setAge(e.target.value)}
        ></input>
        <input
          type="text"
          name="address"
          placeholder="enter your address"
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <input
          type="text"
          name="phone"
          placeholder="enter your phone"
          onChange={(e) => setPhoneNo(e.target.value)}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input type={'file'} onChange={(e)=>ImageUpload(e.target.files[0])}></input>
        <input type={'file'} onChange={(e)=>PdfUpload(e.target.files[0])}></input>
        <input type={"submit"}></input>
      </form>
      {isPending&&<div>loading...</div>}
      {error&&<div>{errMsg}</div>}
    </div>
  );
}

export default App;
