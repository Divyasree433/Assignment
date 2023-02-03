import React,{useState,useEffect} from 'react'
import { Line } from 'react-chartjs-2';
function InventoryChart(props) {
    const [data, setData] = useState({});

    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Stock vs MRP',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
          ],
          borderWidth: 1,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: '#000'
        }
      ]
    };
  
    useEffect(() => {
      props.data.forEach(item => {
        chartData.labels.push(item.batch);
        chartData.datasets[0].data.push({ x: item.stock, y: item.mrp });
      });
      setData(chartData);
    }, [props.data]);
  
    return (
      <div className="chart">
        <Line
          data={data}
          options={{
            title: {
              display: true,
              text: 'Stock vs MRP',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'right'
            },
            scales: {
              xAxes: [{
                type: 'linear',
                position: 'bottom'
              }]
            }
          }}
        />
      </div>
    );
  };
export default InventoryChart