"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [first, setFirst] = useState(null);
  const [last, setLast] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sine-wave");
        const data = await response.json();

        setFirst(data.first);
        setLast(data.last);

        // Use a subset of data to avoid performance issues (e.g., take every 100th point)
        const reducedData = data.allData.filter(
          (_, index) => index % 100 === 0
        );
        setChartData(reducedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Sine Wave Chart</h2>
      {first && last ? (
        <div>
          <p>
            First Value: x={first.x}, y={first.y}
          </p>
          <p>
            Last Value: x={last.x}, y={last.y}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
