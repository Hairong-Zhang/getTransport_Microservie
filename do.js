// get the button from html
const button = document.querySelector('button');
const paragraph = document.querySelector('p');
const input = document.querySelector('input');

// fetch the local transport json and get the name value in the json
const getTransport = async () => {
	const response = await fetch('./transport.json');
	const data = await response.json();
	return data['Transport'][0]['name'];
};

// add event listener to button
button.addEventListener('click', () => {
	fetch('./surgeon.json', {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			//get all names from json and put it into the new array
			const surArray = data['surgeon'];
			const surNames = [];
			for (let i = 0; i < surArray.length; i++) {
				surNames.push(surArray[i]['name']);
			}
			console.log(surNames);
			// if the input value is in the lowercased array
			surNames.forEach((name) => {
				if (name.toLowerCase() === input.value.toLowerCase()) {
					// add the paragraph with the name
					getTransport().then((transport) => {
						paragraph.textContent = `The surgeon is ${name} and the transport is ${transport}`;
					});
				}
			});
		});
});
