import { Card, CardContent, cardContentClasses, Typography } from '@mui/material';
import React from 'react';
import './InfoBox.css';
function InfoBox({title,cases,total}) {
  return (
  <Card className="infoBox">
     
     <cardContent>
        
        <Typography className="infoBox_title" color="textSecondary">
           {title}
        </Typography>

        <h2 className="infoBox_cases">{cases}</h2>

        <Typography color="textSecondary">
            {total} total
        </Typography>

     </cardContent>
  </Card>
  );
}

export default InfoBox;
