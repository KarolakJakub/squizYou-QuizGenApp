import firebase from 'firebase'


export const signUp = signUpForm => {

  const uniqueIdRef = firebase.database().ref('users').push(signUpForm)

  const postId = uniqueIdRef.key

  firebase.database().ref(`users/${postId}`).update({ 'uniqueId': `${postId}` })

  return postId
};

export const signIn = (callback) => {

  const usersRef = firebase.database().ref('users')

  usersRef.once("value").then(snapshot => {
    const snapshotVal = snapshot.val()
    const entries = Object.values(snapshotVal);

    callback(entries)

  })

};

export const getUserNameByUniqueId = (uniqueId, callback) => {

  firebase.database().ref(`users/${uniqueId}/name`).once('value').then( userSnapshot =>
    {
      const userValue = userSnapshot.val()

      callback(userValue)
    })
    
}
