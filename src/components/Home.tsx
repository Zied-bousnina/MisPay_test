import React, { useState, useEffect } from 'react';
import NEOChart from './NEOChart';
import Loader from './Loader';
import { NasaService } from '../_services/nasa.service';

interface NEO {
  id: string;
  name: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  orbital_data: {
    orbiting_body: string;
  };
}

const Home: React.FC = () => {
  const [data, setData] = useState<NEO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getAllData = () => {
    NasaService.getAllNasaData()
      .then((res) => {
        console.log(res.near_earth_objects);
        setData(res.near_earth_objects);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllData();
  }, []);





  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="container mx-auto p-4
    m-4 ">
      {/* <h1 className="text-2xl mb-4">NASA </h1> */}


     <NEOChart data={data} />
    </div>
  );
}

export default Home;