import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const TargetAudienceSection = () => {
  // Sample data for the pie chart
  const chartData = {
    labels: ['Developers', 'Corporate Professionals', 'Bankers', 'Other'],
    datasets: [
      {
        data: [30, 40, 20, 10], // Adjust the values based on your actual user distribution
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#C0C0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#C0C0C0'],
      },
    ],
  };
  const chartStyles = {
    width: '500px', // Set the desired width
    height: '500px',
    marginTop: '30px' // Set the desired height
  };
  return (
    <div className='my-10'>
      <h2 className='title text-3xl md:text-5xl font-extrabold text-center pt-12 pb-6'>Who Can Benefit from Our Website?</h2>
      <p className='text-center text-xl p-8'>
        Our platform is designed to cater to a diverse audience, providing valuable features
        for different professional groups. Whether you are a developer, corporate professional,
        banker, or fall into one of the following categories, our website is tailored to meet
        your needs.
      </p>

      {/* Display the pie chart */}
      <div className="chart-container  mx-auto" style={chartStyles}>
        <Doughnut data={chartData}/>
      </div>
    </div>
  );
};

export default TargetAudienceSection;
