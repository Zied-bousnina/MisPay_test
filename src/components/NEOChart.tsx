import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';


interface NEOChartProps {
  data: {
    name: string;
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
  }[];
}

const NEOChart: React.FC<NEOChartProps> = ({ data }) => {
  const chartData = data.map(neo => ({
    name: neo.name,
    minDiameter: neo.estimated_diameter.kilometers.estimated_diameter_min,
    maxDiameter: neo.estimated_diameter.kilometers.estimated_diameter_max,
  }));

  return (
    <BarChart
      width={700}
      height={500}
      data={chartData}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
    >
      <CartesianGrid

      strokeDasharray="3 3 " />
      <XAxis
      type="number" label={{ value: 'Min Estimated Diameter (km)', position: 'insideBottom', offset: -5 }} />
      <YAxis
        dataKey="name"
        type="category"
        label={{ value: 'NEO Name', angle: -90, position: 'insideLeft', offset: -55 }}
        width={200}

        // padding={{ top: 20, bottom: 20 }}

      />
      <Tooltip />
      <Legend
      verticalAlign='top'
       />
      <Bar dataKey="minDiameter" fill="#342FA1FF" name="Min Estimated Diameter (km)" />
      <Bar dataKey="maxDiameter" fill="#FF0000FF" name="Max Estimated Diameter (km)" />
    </BarChart>
  );
}

export default NEOChart;