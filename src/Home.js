import React, { useEffect, useState } from "react";
import axios from "axios";

import "./style.css";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    Image : 'https://i.ibb.co/L5Pq2yT/984622.png'
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=71ab8b1ec2f7337a7a6dee9ca92a2e05&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
            let imagePath = '';
            if(res.data.weather[0].main === "Clouds"){
                imagePath = "https://i.ibb.co/nDzrBck/51b3b51024ff0a955cfc17e2a5f70c07-removebg-preview.png";
            }
            else if(res.data.weather[0].main === "Clear"){
                imagePath = "https://i.ibb.co/nDzrBck/51b3b51024ff0a955cfc17e2a5f70c07-removebg-preview.png";
            }
            else if(res.data.weather[0].main === "Rain"){
                imagePath = "https://i.ibb.co/nDzrBck/51b3b51024ff0a955cfc17e2a5f70c07-removebg-preview.png";
            }
            else if(res.data.weather[0].main === "Drizzle"){
                imagePath = "https://i.ibb.co/nDzrBck/51b3b51024ff0a955cfc17e2a5f70c07-removebg-preview.png";
            }
            else if(res.data.weather[0].main === "Mist"){
                imagePath = "https://i.ibb.co/nDzrBck/51b3b51024ff0a955cfc17e2a5f70c07-removebg-preview.png";
            }
            else{
                imagePath = 'https://i.ibb.co/L5Pq2yT/984622.png';
            }
            console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath
          })
          setError('');
        })
        .catch(err => {
            if(err.response.status === 404){
                setError("Invalid City Name")
            } else{
                setError('');
            }
            console.log(err);
        })
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter the City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img
              src="https://i.ibb.co/rptz8P5/transparent-search-icon-free-png.webp"
              onClick={handleClick}
              alt=""
            />
          </button>
        </div>
        <div className="error">
            <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.Image} alt="" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img
                src="https://i.ibb.co/sH8PDrG/214-2147710-humidity-icon-removebg-preview.png"
                alt=""
              />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humadity</p>
              </div>
            </div>
            <div className="col">
              <img
                src="https://i.ibb.co/YfDbL3P/images-1-removebg-preview.png"
                alt=""
              />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
