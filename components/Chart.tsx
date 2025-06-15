'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

type Props = {
  data: number[];
  isPositive: boolean;
};

export default function Chart({ data, isPositive }: Props) {
  return (
    <div className="mt-2">
      <Line
        data={{
          labels: data.map((_, i) => i.toString()),
          datasets: [
            {
              data,
              borderColor: isPositive ? '#22c55e' : '#ef4444', // Tailwind green/red
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
          elements: {
            line: { borderJoinStyle: 'round' },
          },
          scales: {
            x: { display: false },
            y: { display: false },
          },
        }}
      />
    </div>
  );
}
