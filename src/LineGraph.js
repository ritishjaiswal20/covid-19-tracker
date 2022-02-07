import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import {Line} from 'react-chartjs-2';
function LineGraph() {
     const [data, setData]=useState({});
   


    const buildCharData=(data, casesType='cases')=>{
      const charData =[];
      let lastDataPoint;
      data[casesType].forEach(date=>{
        if(lastDataPoint){
          const newDataPoint={
            x:date,
            y:data[casesType][date] - lastDataPoint
          }
          charData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][data];
      })
      return charData;
    }
  
    useEffect(()=>{

        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response=> response.json())
        .then(data =>{
         console.log(data);
         const charData= buildCharData(data);
         setData(charData);
        });
       
    },[]);



    return (
  <div>
     <h1>I am a graph</h1>
      <Line data={{
        datasets:[
          {
            backgroundColor: 'rgba(204,16,52,0.5)',
            borderColor: '#cc1034',
            data: data,
          }
        ]
      }}
      />
  
  </div>
  );
}

export default LineGraph;
