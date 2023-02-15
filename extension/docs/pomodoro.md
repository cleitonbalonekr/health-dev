[ ] - Deve se comportar como um pomodoro normal

### use cases

- get actual pomodoro => return pomodoro
- cancel pomodoro => return boolean
- finish pomodoro => return pomodoro
- start chilling time => return endsAt

### Features

- pomodoro
- wather remenber
- notification
- alarm to meetings
- notes

### Future

- feedbak

## Notificação via celular

### Caso 1 | Firebase

- Celular ler QRCode para registar token
- Guarda token do celular no chrome.localstorage
- Enviar a notificação via chrome.gcm.send
