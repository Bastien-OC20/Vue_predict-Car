
// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fastapi-predict-car.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
  },
});

instance.interceptors.request.use(
  (config) => {
    // vérifier le token ? , vous pouvez commenter ou supprimer cette partie
    /*
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Fonction pour se connecter
 * @param {string} nom - Le nom de l'utilisateur
 * @param {string} password - Le mot de passe de l'utilisateur
 * @returns {Object} Les données de la réponse
 */
export const login = async (nom, password) => {
  try {
    const response = await instance.post('/login', null, {
      params: { nom, password },
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = response.data;
    console.log('Connexion réussie');
    return data;
  } catch (error) {
    if (error.response) {
      console.error('Erreur de validation', error.response.data);
      throw error.response.data;
    } else {
      console.error('Erreur de connexion', error);
      throw { detail: 'Erreur de connexion inconnue.' };
    }
  }
};

/**
 * Fonction pour s'inscrire
 * @param {string} email - L'email de l'utilisateur
 * @param {string} nom - Le nom de l'utilisateur
 * @param {string} password - Le mot de passe de l'utilisateur
 * @returns {Object} Les données de la réponse
 */
export const signup = async (email, nom, password) => {
  try {
    const response = await instance.post('/signup', {
      email,
      nom,
      password
    });

    const data = response.data;
    console.log('Inscription réussie');
    return data;
  } catch (error) {
    console.error('Erreur d\'inscription', error);
    throw error;
  }
};


export default instance;