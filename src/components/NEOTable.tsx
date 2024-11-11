
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


interface NEO {
  id: string;
  name: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    orbiting_body: string;
  }[];
}

interface NEOTableProps {
  data: NEO[];
}

const NEOTable: React.FC<NEOTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead
        style={{backgroundColor: '#1976d2',
        color: 'white'


        }}

        >
          <TableRow>
            <TableCell></TableCell>
            <TableCell
            style={{color: 'white',
            fontWeight: 'bold',

            }}
            >NEO Name</TableCell>
            <TableCell style={{color: 'white',fontWeight: 'bold',}}>Min Estimated Diameter (km)</TableCell>
            <TableCell style={{color: 'white',fontWeight: 'bold',}}>Max Estimated Diameter (km)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((neo, index) => (
            <TableRow key={neo.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{neo.name}</TableCell>
              <TableCell>{neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)}</TableCell>
              <TableCell>{neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NEOTable;