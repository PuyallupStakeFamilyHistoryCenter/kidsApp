export function writeToSocket(data) {
  return {
    type: "WRITE_DATA",
    payload: data,
    meta: { websocket: true }
  };
}