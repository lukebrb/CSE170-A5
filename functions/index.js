const functions = require('firebase-functions');
const admin = require('firebase-admin');

const algoliasearch = require('algoliasearch');

admin.initializeApp();
const db = admin.firestore();

const env = functions.config();
//     const algolia = algoliasearch(
//       'YOO25R596Q',
//       '527e21ccf63d7664fe1a99aa349e2a3f'
//     );
//     const index = algolia.initIndex('office_hours_questions');

// Returns OH for selected course
exports.getOH = functions.https.onCall( async (course) => {
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

exports.newQuestion = functions.https.onCall( data => {
  const {course, TA, answer, location, question, time, day, path} = data;
  const key = 'OH.' + day + '.' + time + '.questions';

  db.collection("courses")
    .doc(course)
    .get()
    .then(doc => {
      var OH = doc.data().OH;

      for (let q in OH[day][time].questions) {
        let qPath = OH[day][time].questions[q];

        db.doc(qPath)
          .get()
          .then(doc => {
            if ( TA === doc.data().TA  && doc.data().question === '') {
              db.collection('courses')
                .doc(course)
                .update({
                  [key]: admin.firestore.FieldValue.arrayRemove(qPath)
                }).then(() => {
                  db.collection('courses')
                    .doc(course)
                    .update({
                      [key]: admin.firestore.FieldValue.arrayUnion(path)
                    })
                })
            }
          })
      }
    })
})