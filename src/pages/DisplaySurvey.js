import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { DefaultSidebar } from '../components/Sidebar';
import Footer from '../components/Footer';

let token = localStorage.getItem('token');

const AfficherSondage = () => {
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState([]);
  useEffect(() => {
    // Récupérer les données du sondage depuis l'API
    const recupererDonnees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sondage/view', {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });
        console.log(response.data);
        setTitre(response.data.titre)
        setContenu(response.data.contenu);
      } catch (erreur) {
        console.error('Erreur lors de la récupération des données du sondage :', erreur);
      }
    };

    return () => {

      recupererDonnees();
    }
    // recupererDonnees();

  }, []); // L'effet sera exécuté une seule fois lors du montage du composant


  return (
    
     <div className="flex flex-col h-screen">
     {/* Navbar */}
     <Navbar />

     {/* Contenu principal */}
     <div className="flex flex-grow">
       {/* Sidebar */}
       <div className="">
         <DefaultSidebar />
       </div>

       {/* Contenu du Dashboard */}
       <div className="flex-grow p-4 flex items-center justify-center">
 {/* Bouton "Créer ton premier sondage" avec Link */}
 <div>

      {
        contenu.length === 0 ? (<div

          className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
        >
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">
            Chargement...
          </h2>
          <p className="w-1/3 text-center text-white">
            Cela peut prendre quelques secondes, veuillez ne pas fermer cette
            page.
          </p>
        </div>) : (<h2 className="text-black font-bold text-xl my-4">Titre du Sondage</h2>)
      }
<div class="w-64 h-auto bg-gray-300 mb-16">
<ul class="">
        <h3 className='bg-orange-500 text-xl text-white'>{titre}</h3>
        <ul>
          {contenu.map((question, indexQuestion) => (
            <li key={indexQuestion}>
              <p className='text-blue-600 p-3'>Question {indexQuestion + 1}</p>
              <p className='text-black p-3 '>{question.question}</p>
              <ul>
                <p className='bg-gray-800 text-xl text-white'> options</p>
                {question.options.map((option, indexOption) => (
                  <li className='p-3 text-left font-bold' key={indexOption}>
                    <input
                      type="checkbox"
                      id={`option-${indexQuestion}-${indexOption}`}
                      name={`option-${indexQuestion}`}
                      value={option}
                    />
                    <label htmlFor={`option-${indexQuestion}-${indexOption}`} className='text-black'>{option}</label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button className="w-100 bg-blue-600 mb-8 rounded p-3 font-semibold text-sm text-blue-100 hover:bg-blue-700">
              Envoyer
            </button>
      </ul>
</div>
     
    </div>
</div>

     </div>

     {/* Footer */}
     <Footer />
   </div>
  );
};

export default AfficherSondage;