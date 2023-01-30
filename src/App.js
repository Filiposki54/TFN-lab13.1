// @flow
import React, { useState, useEffect } from 'react';
import './App.css';

type Person = {
  name: {
    first: string,
    last: string
  },
  email: string,
  location: {
    city: string,
    country: string
  },
  phone: string,
  picture: {
    large: string
  },
  dob: {
    age: number
  }
};

function App() {
  const [person, setPerson] = useState(null: ?Person);
  const [loading, setLoading] = useState(true: boolean);
  const [error, setError] = useState(null: ?Error);

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
      <img src={person.picture.large} alt={`${person.name.first} ${person.name.last}`} />
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
App.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
    }),
    email: PropTypes.string,
    location: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
    }),
    picture: PropTypes.shape({
      large: PropTypes.string,
    }),
    phone: PropTypes.string,
    dob: PropTypes.shape({
      age: PropTypes.number,
    }),
  }),
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  handleClick: PropTypes.func,
};

App.defaultProps = {
  person: null,
  loading: true,
  error: null,
  handleClick: () => {},
};

export default App;
