const router = require('express');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const routes = new router()

const userCollection = 'users';

routes.post('/users', async (request, response) => {
  const { name, email } = request.body;
  const user = {
    name,
    email,
  };
  try {
    const newDoc = await db.collection(userCollection).add(user);
    response.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
      response.status(400).send(`User should cointain name and email!!!`)
  }
});

routes.get('/users', async (request, response) => {
  try {
    const userQuerySnapshot = await db.collection(userCollection).get();
    const users = [];
    userQuerySnapshot.forEach(
        (doc)=>{
          users.push({
          id: doc.id,
          data:doc.data()
        });
        }
    );
    response.status(200).json(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = routes;