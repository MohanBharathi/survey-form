import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function CandidateList() {
    const [data,setData] = useState([]);
    useEffect(()=>{axios("http://localhost:3000/data").then(res=>setData(res.data))},[])
  return (
    <table>
        <thead>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Resume</th>
            </tr>
        </thead>
        <tbody>
        {data&&data.map((item)=>(
            <tr key={item.id}>
                <td className='img-container'><img src={item.imgUrl} alt={item.name + "photo"} /></td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>{item.phoneNo}</td>
                <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
                {/* <td><a target="_blank" href={item.pdfUrl} >resume</a></td> */}
                <td><a href={item.pdfUrl.url} target='_blank'>click</a></td>
            </tr>
        ))}
        </tbody>
    </table>
  )
}
