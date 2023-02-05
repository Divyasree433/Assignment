import React, { useState, useEffect } from "react";
import {
  LineChart,
  ResponsiveContainer,
  Legend, Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

function InventoryChart({arr}) {
  return (
    <>
            <h1 className="text-heading">
                Line Chart
            </h1>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={arr} margin={{ right: 50 }}>
                    <CartesianGrid />
                    <XAxis dataKey="name" 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="rate"
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="fees"
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
  )
}

export default InventoryChart