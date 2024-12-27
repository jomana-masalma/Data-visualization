import React from 'react';

const HeadComponent: React.FC = () => {
  return (
    <header style={{ backgroundColor: '#4682B4', padding: '1rem', textAlign: 'center', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>Underwater Communication</h1>
    </header>
  );
};

export default HeadComponent;