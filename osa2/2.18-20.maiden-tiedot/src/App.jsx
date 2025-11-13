import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_OPENWEATHERMAP  // muuttujassa api_key on nyt käynnistyksessä annettu API-avaimen arvo

  const fetchCountries = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      setCountries(res.data)
    } catch (err) {
      setError(err.message || 'Failed to fetch countries')
    } finally {
      setLoading(false)
    }
  }

  const fetchWeather = async () => {
    {console.log('API Key:', api_key)}
    setLoading(true)
    setError(null)
    try {
      const geoRes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${selectedCountry}&appid=${api_key}`)
      if (!geoRes.data || geoRes.data.length === 0) {
        throw new Error('Geocoding failed')
      }
      const { lat, lon } = geoRes.data[0];
      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      setWeather(weatherRes.data)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const filtered = countries.filter(c =>
    (c.name?.common || '').toLowerCase().includes(filter.toLowerCase())
  )

  const showCountryDetails = (country) => {
    console.log('Showing details for:', country);
    setSelectedCountry(country);
    fetchWeather();
    console.log('Weather data: ', weather);
  };

  const renderCountryDetails = (country) => (
    <div>
      <h2>{country.name?.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Languages:</strong></p>
      <div>
        {country.languages
          ? Object.values(country.languages).map((lang, idx) => (
              <div key={idx}>{lang}</div>
            ))
          : <div>No languages listed</div>}
      </div>
      {country.flags?.png && (
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name?.common}`}
          style={{ width: '200px' }}
        />
      )}
      <div>
        <h3>Weather in {country.name?.common + ", " + country.capital?.[0] || 'N/A'}</h3>
        {weather ? (
          <div>
            <p><strong>Temperature:</strong> {(weather.main.temp - 273.15).toFixed(2)} °C</p>
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
            <p><strong>Weather:</strong> {weather.weather[0].description}</p>
            {weather.weather[0].icon && (
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}>
              </img>
            )}
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <p>find countries</p>
      <input
        type="text"
        placeholder="Filter countries..."
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setSelectedCountry(null);
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && (() => {
      const exactMatch = countries.find(
        c => (c.name?.common || '').toLowerCase() === filter.toLowerCase()
      );

      if (selectedCountry) {
        return renderCountryDetails(selectedCountry);
      } else if (exactMatch || filtered.length === 1) {
        return renderCountryDetails(exactMatch || filtered[0]);
      } else if (filtered.length > 10) {
        return <p>Too many matches, specify another filter</p>;
      } else {
        return (
          <div>
            {filtered.map((c) => (
              <div key={c.cca3 || c.ccn3 || c.name?.common || JSON.stringify(c)}>
                {c.name?.common || c.name || 'Unnamed country'}
                <button onClick={() => showCountryDetails(c)}>Show</button>
              </div>
            ))}
          </div>
        );
      }
      })()}
    </>
  );
}

export default App
