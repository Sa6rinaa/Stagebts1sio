import axios from 'axios';
import { useState } from 'react';

function RandomButton() {
  const [number, setNumber] = useState(null);

  const getRandomNumber = () => {
    console.log("Bouton cliqué");  // ← ce log doit apparaître
    axios.get('http://localhost:3333/RandomNumber')
      .then(response => {
        console.log(response.data); 
        setNumber(response.data.number);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nombre :', error);
      });
  };

  return (
    <div className="App">
      <h4>Générateur de nombre aléatoire</h4>
      <button onClick={getRandomNumber}>Générer un chiffre entre 1 et 5</button>
      {number !== null && <p>Nombre reçu : {number}</p>}
    </div>
  );
}

export default RandomButton;

