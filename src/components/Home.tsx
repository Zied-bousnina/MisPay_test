// src/components/Home.tsx
import React, { useState, useEffect } from 'react';
import NEOChart from './NEOChart';
import Loader from './Loader';
import { NasaService } from '../_services/nasa.service';
import { Autocomplete, TextField } from '@mui/material';

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

const Home: React.FC = () => {
  const [data, setData] = useState<NEO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<string>('');

  const getAllData = () => {
    NasaService.getAllNasaData()
      .then((res) => {
        setData(res.near_earth_objects);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllData();
  }, []);

  const filteredData = filter
    ? data.filter((neo) =>
        neo.close_approach_data.some((approach) => approach.orbiting_body === filter)
      )
    : data;
console.log(filteredData);
  const orbitalBodies = Array.from(
    new Set(data.flatMap(neo => neo.close_approach_data.map(approach => approach.orbiting_body)))
  );
console.log(orbitalBodies);
  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
      <div className="container mx-auto p-4 m-4 flex">
      <div className="flex-grow">
        <NEOChart data={filteredData} />
      </div>
      <div className="ml-4">
        <Autocomplete
          options={orbitalBodies}
          getOptionLabel={(option) => option}
          style={{ width: 230 }}
          renderInput={(params) => <TextField {...params} label="Orbital Body" variant="outlined" />}
          onChange={(event, value) => setFilter(value || '')}
          disableClearable
        />
      </div>
    </div>
  );
};

export default Home;