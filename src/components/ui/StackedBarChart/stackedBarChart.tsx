'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import Card from '@/components/ui/Card/Card'; // Adjust path as needed
import processData from '../../../../data/processData'; // Adjust path as needed

const EncoderDecoderBarChart: React.FC = () => {
  const chartData = processData.processEncoderDecoderData();

  return (
    <Card
      title="Message Encoder-Decoder Analysis"
      description="Distribution of Encoder and Decoder Counts"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="flex justify-center items-center">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="encoder" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Decoder Count" stackId="a" fill="#8884d8" />
              <Bar dataKey="count" name="Encoder Count" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table Section */}
        <div>
          <h3 className="text-lg font-semibold text-center">Encoder-Decoder Details</h3>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Encoder</th>
                <th className="border px-4 py-2 text-left">Decoder</th>
                <th className="border px-4 py-2 text-right">Count</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((data, index) => (
                <tr key={index} className="text-left">
                  <td className="border px-4 py-2">{data.encoder}</td>
                  <td className="border px-4 py-2">{data.decoder}</td>
                  <td className="border px-4 py-2 text-right">{data.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default EncoderDecoderBarChart;
