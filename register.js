import { Util, Permissions, Notifications, Constants } from 'expo'

export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return
  }

  let token = await Notifications.getExpoPushTokenAsync()

  const zone = await Util.getCurrentTimeZoneAsync()
  const res = await fetch('https://<my-url>.amazonaws.com/dev/subscribe', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      zone,
      deviceId: Constants.deviceId,
      deviceName: Constants.deviceName,
    }),
  })

  console.log('registered!')
  return await res.json()
}
