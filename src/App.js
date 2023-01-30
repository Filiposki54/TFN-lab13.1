import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        setPerson(data.results[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleClick = () => {
    setLoading(true);
    setError(null);
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        setPerson(data.results[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <img
        src={person.picture.large}
        alt={`${person.name.first} ${person.name.last}`}
      />
      <h1>{`${person.name.first} ${person.name.last}`}</h1>
      <p>{person.email}</p>
      <p>
        {person.location.city}, {person.location.country}
      </p>
      <p>{person.phone}</p>
      <p>{person.dob.age} years old</p>
      <button onClick={handleClick}>Losuj nowe dane</button>
    </div>
  );
}

export default App;
