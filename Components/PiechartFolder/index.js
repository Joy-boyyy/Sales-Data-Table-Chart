// const PieChartComponent=(props)=>{



import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './index.css'

const PieChartComponent = (props) => {


      const{arrDa,selectedMonth} =props

    const Jwelery=arrDa.filter((filterProp)=> filterProp.category.includes('jewelery')).length
    const Cloth=arrDa.filter((filterProp)=> filterProp.category.includes('cloth')).length
    const Electro=arrDa.filter((filterProp)=> filterProp.category.includes('electronics')).length

    const pieData=[{name:'jwelery',value:Jwelery},{name:'cloth',value:Cloth},{name:'electro',value:Electro}]
    
    

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='pieDiv'>
        <h1 className='h1Bar'>Pie Chart Stats - {selectedMonth}</h1>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
