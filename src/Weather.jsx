import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCloud,
  FaCloudSun,
  FaInfoCircle,
  FaSearch,
  FaTemperatureHigh,
  FaWind,
  FaTint
} from "react-icons/fa";

export default function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "cf3a5d7de40e39842db481729c9a9f28";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, fail);
    }
  }, []);

  const success = async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setData(res.data);
      setError("");
    } catch {
      setError("Unable to detect location weather");
    }
    setLoading(false);
  };

  const fail = () => setError("Location permission denied");

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setData(res.data);
      setError("");
    } catch {
      setError("City not found");
      setData(null);
    }
    setLoading(false);
  };

  const getBackgroundImage = () => {
    if (!data)
      return "url('https://images.unsplash.com/photo-1553902001-149de4c1bd99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNsZWFyJTIwd2VhdGhlciUyMCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')";
    const main = data.weather[0].main.toLowerCase();
    if (main.includes("cloud"))
      return "url('https://images.unsplash.com/photo-1721867465507-972d9bb30071?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VhdGhlciUyMGNsb3VkfGVufDB8fDB8fHww')";
    if (main.includes("rain"))
      return "url('https://media.istockphoto.com/id/1429701799/photo/raindrops-on-asphalt-rain-rainy-weather-downpour.webp?a=1&b=1&s=612x612&w=0&k=20&c=jc45vpqNDgrvRZAn2foO82IhW9rUeXbQfxvLZaDW8H8=')";
    if (main.includes("clear"))
      return "url('https://plus.unsplash.com/premium_photo-1733317236155-b0e1a2930f37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYXIlMjB3ZWF0aGVyfGVufDB8fDB8fHww')";
    if (main.includes("snow"))
      return "url('https://images.unsplash.com/photo-1735592054132-f66712d6356e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c25vdyUyMCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D')";
    return "url('https://images.unsplash.com/photo-1612251276789-9b1a8f2add8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsZWFyJTIwc2t5fGVufDB8fDB8fHww')";
  };

  return (
    
    <div
  className="w-screen h-screen flex justify-center items-center rounded-3xl overflow-hidden bg-cover bg-center transition-all duration-1000"
  style={{ backgroundImage: getBackgroundImage() }}
>
<div className="max-w-md w-full bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
        {/* Header */}
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-black drop-shadow-md animate-pulse">
          <FaCloudSun /> Weather App
        </h1>

        {/* Search input */}
        <div className="flex gap-3 justify-center">
          <div className="relative flex-1">
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black cursor-pointer"
              onClick={getWeather}
            />
            <input
              type="text"
              placeholder="Enter city"
              className="w-full p-3 pl-10 rounded-xl text-center text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button
            onClick={getWeather}
            className="bg-black/20 text-black px-6 py-3 rounded-xl font-semibold hover:bg-green-400/30 transition"
          >
            Search
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-600 font-semibold">{error}</p>}

        {/* Loading */}
        {loading && <p className="text-black font-bold animate-ping">Loading...</p>}

        {/* Weather info */}
        {data && !loading && (
          <div className="space-y-4 text-black">
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />
            <div className="flex flex-col gap-2">
              <p className="flex items-center justify-center gap-2">
                <FaTemperatureHigh /> {data.main.temp}°C
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaCloud /> {data.weather[0].main}
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaInfoCircle /> {data.weather[0].description}
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaTint /> Humidity: {data.main.humidity}%
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaWind /> Wind: {data.wind.speed} km/h
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
