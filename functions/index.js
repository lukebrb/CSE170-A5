const functions = require('firebase-functions');
const admin = require('firebase-admin');

const algoliasearch = require('algoliasearch');

admin.initializeApp();
const db = admin.firestore();

const env = functions.config();

//const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
//const index = client.initIndex('office_hours_questions');


exports.getOH = functions.https.onCall( async (course, context) => {
  var queries = [];
  var OH;

  return db.collection("courses")
    .doc(course)
    .get()
    .then(async doc => {
      OH = doc.data().OH;

      for (let day in OH) {
        for (let time in OH[day]){
          for (let q in OH[day][time].questions) {
            let qPath = OH[day][time].questions[q]

            // would ideally want this to be a promise.all
            await db.doc(qPath).get().then(qData => OH[day][time].questions[q] = qData.data()); 
          }
        }
      }
      return OH;
    })    
})