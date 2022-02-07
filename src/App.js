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
  const[countryInfo,setCountryInfo]=useState({});
  const[tableData, setTableData]=useState([]);
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then((data)=>{
      setCountryInfo(data);
  });
},[]);
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
        setTableData(data);
        setCountries(countries);
      })
    }
    getCountriesData();
  },[]);

  const onCountryChange = async (event)=>{
    const countryCode= event.target.value;
    setCountry(countryCode);

    
    const url = countryCode === "Worldwide" ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;


    await fetch(url)
    .then(response =>response.json())
    .then(data =>{
      setCountry(countryCode);

      // all of the data 
      //from th country response
      setCountryInfo(data);
    });
  
  };
console.log("countryInfo",countryInfo);
  return (
    <div className="app">
 
    <div className="app_left">
      
     <div className="app_header">
      <h1>Covid 19 tracker</h1>
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
        cases={countryInfo.todayCases}
       total={countryInfo.cases}
      
       />
       <InfoBox title="Recovery"
       total={countryInfo.recovered}
       cases={countryInfo.todayRecovered}
       />
       <InfoBox title="Deaths"
       total={countryInfo.deaths}
       cases={countryInfo.todayDeaths}
       />
     </div>
        <Map/>
     </div>
        
        <Card className="app_right">
          <CardContent>
             <h3>Live cases by country</h3>
             <table countriea={tableData}/>
             <h3>Worldwide new cases</h3>
          </CardContent>
        </Card>


    </div>
  );
}

export default App;
