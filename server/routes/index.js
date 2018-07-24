import express from 'express'
import admin from 'firebase-admin'

const router = express.Router()

/**
 * CLIENT:
 * 
 * axios.post('http://localhost:3000/firebase-admin', {user: 'nm', password: 123})
 *  .then(res => console.log(res.data)) -> {whatever: '123'}
 */


const serviceAccount = require('../../../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://leap-b2c4c.firebaseio.com'
});

router.use('/firebase-admin/:uid/profile')

  .get((req, res) => {
    const uid = req.params.uid
    admin.auth().getUser(uid)
      .then(userRecord => {
        res.send(userRecord.toJSON()) // {email: 'nm1077', avatar: '', ...}
      })
    
  })

  .post((req, res) => {
    // console.log(req.body) => {user: 'nm, ...}
    res.send({whatever: '123'})
  })

  .put()
  .delete()

export default router