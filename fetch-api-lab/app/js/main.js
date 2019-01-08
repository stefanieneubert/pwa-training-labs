/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
}

function validateResponse(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

function readResponseAsJson(response) {
	return response.json();
}

function readResponseAsBlob(response) {
	return response.blob();
}

function showImage(responseAsBlob) {
	// Assuming the DOM has a div with id 'container'
	var container = document.getElementById('img-container');
	var imgElem = document.createElement('img');
	container.appendChild(imgElem);
	var imgUrl = URL.createObjectURL(responseAsBlob);
	imgElem.src = imgUrl;
}

function readResponseAsText(response) {
	return response.text();
  }
  
function showText(responseAsText) {
	// Assuming the DOM has a div with id 'message'
	var message = document.getElementById('message');
	message.textContent = responseAsText;
}


// Fetch JSON ----------

function fetchJSON(pathToResource) {
	fetch(pathToResource)
		.then(validateResponse)
		.then(readResponseAsJson)
		.then(logResult)
		.catch(logError);
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON('examples/animals.json'));
fetchJSON('examples/animals.json')

// Fetch Image ----------

function fetchImage(pathToResource) {
  fetch(pathToResource)
  .then(validateResponse)
  .then(readResponseAsBlob)
  .then(showImage)
  .catch(logError);
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage('examples/fetching.jpg'));


// Fetch text ----------
  
function fetchText(pathToResource) {
	fetch(pathToResource)
	.then(validateResponse)
	.then(readResponseAsText)
	.then(showText)
	.catch(logError);
}

const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText('examples/words.txt'));


// HEAD request ----------

function checkSize(response) {
	var size = response.headers.get('content-length');
	// Do stuff based on response size
}
  
  function headRequest(pathToResource) {
	fetch(pathToResource, {
	  method: 'HEAD'
	})
	.then(validateResponse)
	.then(checkSize)
	// ...
	.catch(logError);
  }

const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest('examples/words.txt'));


// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {
	fetch('someurl/comment', {
		method: 'POST',
		body: new FormData(document.getElementById('msg-form'))
	  })
}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);
