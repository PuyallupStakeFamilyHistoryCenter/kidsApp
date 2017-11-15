const socket = new WebSocket('ws://localhost:8080/');

export default setupWebsocket = () => {
	return dispatch => {
		// Connection opened
		socket.addEventListener('open', event => {
		    dispatch({
		    	type: 'APP.WEBSOCKET_CONNECTED'
		    });
		});

		// Connection opened
		socket.addEventListener('error', err => {
		  	dispatch({
		    	type: 'APP.WEBSOCKET_ERROR'
		    });
		});

		// Listen for messages
		socket.addEventListener('message', event => {
		    let data = event.data;
		    try {
		      data = JSON.parse(data);
		    } catch(e) {
		      data = {
		      	responseType: event.data.split(' ')[0]
		      };
		    }
		    dispatch({
		    	...data,
		    	type: 'MSG.' + data.responseType,
		    });
		});
	};
}

export const sendMessage = (key) => {
	socket.send(key);
};