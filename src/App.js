import './App.css';
import FormControl from '@mui/material/FormControl'; 
import { MenuItem,Select} from '@mui/material';
import { useEffect, useState } from 'react';
//https://disease.sh/v3/covid-19/countries

function App() {
  const[countries,setCountries]=useState([]);
  const[country,setCountry]=useState("world wide")
  useEffect(()=>{
    const getCountriesData= async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries= data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2,
        })
        );
        setCountries(countries);
      })
    }
    getCountriesData();
  },[]);

  const onCountryChange = async (event)=>{
    const countryCode= event.target.value;
    console.log("country-code--",countryCode);
  }
  return (
    <div className="app">
      <div className="app_header">
      <h1>covid 19 tracker</h1>
      <FormControl>
         <Select variant="outlined" onChange={onCountryChange}value={country}>
         <MenuItem value="World-wide">Worldwide</MenuItem>
          {
            countries.map((country)=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
         </Select>
      </FormControl>
      </div>
    </div>
  );
}

export default App;
