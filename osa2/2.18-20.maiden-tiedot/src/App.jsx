import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchCountries = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      setCountries(res.data)
    } catch (err) {
      setError(err.message || 'Failed to fetch')
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

  return (
    <>
      <p>find countries</p>
      <input
        type="text"
        placeholder="Filter countries..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && (() => {
      const exactMatch = countries.find(
        c => (c.name?.common || '').toLowerCase() === filter.toLowerCase()
      );

      const showDetails = exactMatch || filtered.length === 1;
      const countryToShow = exactMatch || filtered[0];

      if (showDetails && countryToShow) {
        return (
          <div>
            <h2>{countryToShow.name?.common}</h2>
            <p><strong>Capital:</strong> {countryToShow.capital?.[0] || 'N/A'}</p>
            <p><strong>Area:</strong> {countryToShow.area} km²</p>
            <p><strong>Languages:</strong></p>
            <ul>
              {countryToShow.languages
                ? Object.values(countryToShow.languages).map((lang, idx) => (
                    <li key={idx}>{lang}</li>
                  ))
                : <li>No languages listed</li>}
            </ul>
            {countryToShow.flags?.png && (
              <img
                src={countryToShow.flags.png}
                alt={`Flag of ${countryToShow.name?.common}`}
                style={{ width: '200px'}}
              />
            )}
          </div>
        );
      } else if (filtered.length > 10) {
        return <p>Too many matches, specify another filter</p>;
      } else {
        return (
          <div>
            {filtered.map((c) => (
              <div key={c.cca3 || c.ccn3 || c.name?.common || JSON.stringify(c)}>
                {c.name?.common || c.name || 'Unnamed country'}
              </div>
            ))}
          </div>
          );
        }})()}
    </>
  );
}

export default App
