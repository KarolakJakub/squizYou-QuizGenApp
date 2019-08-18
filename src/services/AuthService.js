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

  firebase.database().ref(`users/${uniqueId}/name`).once('value').then(userSnapshot => {
    const userValue = userSnapshot.val()

    callback(userValue)
  })

}

export const signUpWithFirebase = (email, password) => {

  return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {

    const errorCode = error.code

    switch (errorCode) {
      case 'auth/email-already-in-use':
        alert('Konto pod tym emailem już istneieje.')
        break;

      case 'auth/invalid-email':
        alert('Nieprawidłowy adres email')
        break;

      case 'auth/operation-not-allowed':
        alert('Nieprawidłowa operacja.')
        break;

      case 'auth/weak-password':
        alert('Hasło jest za proste')
        break;

      default:
        break;
    }

  })
}


export const checkCurrentUserWithAlerts = () => {

  const currentUser = firebase.auth().currentUser

  return currentUser === null ? null : alert('Użytkownik zalogowany.')

}

export const signInWithFirebase = (email, password) => {

  return firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {

    const errorCode = error.code

    switch (errorCode) {
      case 'auth/user-disabled':
        alert('Użytkownik zablokowany.')
        break;

      case 'auth/invalid-email':
        alert('Nieprawidłowy adres email')
        break;

      case 'auth/user-not-found':
        alert('Użytkownik nie istnieje.')
        break;

      case 'auth/wrong-password':
        alert('Złe hasło.')
        break;

      default:
        break;
    }

  })
}

export const signOutWithFirebase = () => {

  return firebase.auth().signOut()

}