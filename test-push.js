const Expo = require('expo-server-sdk')
const expo = new Expo()

const postNotifications = tokens =>
  Promise.all(
    expo
      .chunkPushNotifications(
        tokens.map(token => ({
          to: token,
          sound: 'default',
          title: 'Some Title',
        }))
      )
      .map(expo.sendPushNotificationsAsync, expo)
  )

const tokens = ['ExponentPushToken[oj4iK4CRA7Ry8gDCrtawef]']

postNotifications(tokens)
  .then(receipts => {
    console.log(receipts)
  })
  .catch(console.error)
