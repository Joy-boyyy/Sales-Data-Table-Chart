// Important note

// Chart will display the price range and the number of items in that range for
// the selected month using API
//without selecting any month it will show chart related all data whatever it is getting
//-------------------------------------------------------------------------



import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from "recharts";
import './index.css';

const Barchart = (props) => {
  const { arrDa,selectedMonth } = props;

  // Define price ranges
  const priceRanges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 101, max: 200 },
    { range: '201-300', min: 201, max: 300 },
    { range: '301-400', min: 301, max: 400 },
    { range: '401-500', min: 401, max: 500 },
    { range: '501-600', min: 501, max: 600 },
    { range: '601-700', min: 601, max: 700 },
    { range: '701-800', min: 701, max: 800 },
    { range: '801-900', min: 801, max: 900 },
    { range: '901 above', min: 901, max: Infinity },
  ];

  // Group data by price range
  const rangeData = priceRanges.map(range => ({
    name: range.range,
    count: arrDa.filter(item => item.price >= range.min && item.price <= range.max).length,
  }));

  return (
    <div className='chartDiv'>
      <h1 className='h1Bar'>Bar Chart Stats - {selectedMonth}</h1>
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={rangeData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="name"
          tick={{
            stroke: "gray",
            strokeWidth: 1,
          }}
        />
        <YAxis
          domain={[0, 80]} 
        />
        <Tooltip contentStyle={{ backgroundColor: 'grey' }} />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="count" name="Count" fill="aqua" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default Barchart;
