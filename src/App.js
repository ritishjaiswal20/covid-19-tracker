import './App.css';
import FormControl from '@mui/material/FormControl'; 
import { Card, CardContent, MenuItem,Select} from '@mui/material';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
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
    setCountry(countryCode);
  }
  return (
    <div className="app">
 
    <div className="app_left">
      
     <div className="app_header">
      <h1>covid 19 tracker</h1>
      <FormControl>
         <Select variant="outlined" onChange={onCountryChange} value={country}>
         <MenuItem value="World-wide">Worldwide</MenuItem>
          {
            countries.map((country)=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
         </Select>
      </FormControl>
      </div>
     <div className="app_stats">
       <InfoBox title="CorornaVirus cases"
       total={3000}
       cases={123}
       />
       <InfoBox title="Recovery"
       total={2000}
       cases={345}
       />
       <InfoBox title="Deaths"
       total={4000}
       cases={133}
       />
     </div>
        <Map/>
     </div>
        
       <Card className="app_right">
         <CardContent>
             <h3>Live cases by country</h3>
             <h3>Worldwide new cases</h3>
         </CardContent>
        </Card>


    </div>
  );
}

export default App;
