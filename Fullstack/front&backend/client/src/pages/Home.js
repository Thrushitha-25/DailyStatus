import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = () => {
    const [data,setData]=useState([]);

    const loadData=async()=>{
        const response=await axios.get("http://localhost:6010/api/get")
        setData(response.data);
    };
    
    return (
    <div>
        <h2>Home</h2>
    </div>
  )
}
export default Home
