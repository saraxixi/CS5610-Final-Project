import { useState, useEffect } from 'react';

function HomePage() {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/artifacts')
      .then(res => res.json())
      .then(data => setArtifacts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Dunhuang Digital Museum</h1>
      <ul>
        {artifacts.map(artifact => (
          <li key={artifact._id}>
            <h3>{artifact.title}</h3>
            <img src={artifact.images[0]} alt={artifact.title} width={200} />
            <p>{artifact.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
