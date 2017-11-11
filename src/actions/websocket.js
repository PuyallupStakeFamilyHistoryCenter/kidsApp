import io from 'socket.io-client';
import {MESSAGE_TYPES, SOCKET_URL} from '../config';
const socket = io(SOCKET_URL);

const init = (store) => {
  // add listeners to socket messages so we can re-dispatch them as actions
  Object.keys(MESSAGE_TYPES)
    .forEach(type => socket.on(type, (payload) => store.dispatch({ type, payload })))
}

const emit = (type, payload) => socket.emit(type, payload)

export {
  init,
  emit
}