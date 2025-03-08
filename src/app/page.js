"use client";

import { useEffect, useRef, useState } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const plotRef = useRef(null);
  const initialRange = useRef(null);

  useEffect(() => {
    const startLoad = performance.now();
    fetch("/api/sine-wave")
      .then((res) => res.json())
      .then((result) => {
        if (result.error) throw new Error(result.error);
        setData(result);
        setLoading(false);
        const endLoad = performance.now();
        console.log(`Data load time: ${(endLoad - startLoad).toFixed(2)} ms`);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const startChart = performance.now();
    const dataMin = data.x.reduce((min, val) => Math.min(min, val), data.x[0]);
    const dataMax = data.x.reduce((max, val) => Math.max(max, val), data.x[0]);
    initialRange.current = { xMin: dataMin, xMax: dataMax };

    const opts = {
      width: 1200,
      height: 600,
      scales: {
        x: { time: false, auto: true },
        y: { auto: true },
      },
      series: [{}, { stroke: "#00bfff", width: 1 }],
      axes: [
        {
          stroke: "#e0e0e0",
          grid: { show: false },
          values: (self, splits) => splits.map((v) => v.toFixed(8)),
        },
        {
          stroke: "#e0e0e0",
          grid: { show: true, stroke: "#444", width: 0.5 },
        },
      ],
      hooks: {
        ready: [
          (u) => {
            if (chartRef.current) {
              const plotDiv = chartRef.current;
              const wheelHandler = (e) => {
                const startZoom = performance.now();
                e.preventDefault();
                const { scales } = u;
                const { min: xMin, max: xMax } = scales.x;
                const xRange = xMax - xMin;
                const factor = e.deltaY < 0 ? 0.9 : 1.1;
                const cursorX = u.cursor.left;
                const dataX = u.posToVal(cursorX, "x");

                const newRange = xRange * factor;
                const left = dataX - (dataX - xMin) * factor;
                const right = left + newRange;

                const { xMin: dataMin, xMax: dataMax } = initialRange.current;
                const clampedLeft = Math.max(dataMin, left);
                const clampedRight = Math.min(dataMax, right);

                u.setScale("x", { min: clampedLeft, max: clampedRight });

                const endZoom = performance.now();
                console.log(
                  `Zoom time: ${(endZoom - startZoom).toFixed(2)} ms`
                );
              };
              plotDiv.addEventListener("wheel", wheelHandler);
              plotDiv._wheelHandler = wheelHandler;
            }
          },
        ],
      },
    };

    plotRef.current = new uPlot(opts, [data.x, data.y], chartRef.current);

    const endChart = performance.now();
    console.log(
      `Chart creation time: ${(endChart - startChart).toFixed(2)} ms`
    );

    return () => {
      if (plotRef.current) {
        const plotDiv = chartRef.current;
        if (plotDiv && plotDiv._wheelHandler) {
          plotDiv.removeEventListener("wheel", plotDiv._wheelHandler);
        }
        plotRef.current.destroy();
      }
    };
  }, [data]);

  const handleReset = () => {
    if (plotRef.current && initialRange.current) {
      plotRef.current.setScale("x", {
        min: initialRange.current.xMin,
        max: initialRange.current.xMax,
      });
    }
  };

  return (
    <div
      style={{
        padding: "40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>dataset visualization</h1>
      {loading ? (
        <p>loading data...</p>
      ) : data ? (
        <div className={`chart-container ${data ? "loaded" : ""}`}>
          <p>total rows in csv: {data.totalRows.toLocaleString()}</p>
          <p>displayed points: {data.x.length.toLocaleString()}</p>
          <button onClick={handleReset}>reset view</button>
          <div ref={chartRef} />
        </div>
      ) : (
        <p>error loading data</p>
      )}
    </div>
  );
}
