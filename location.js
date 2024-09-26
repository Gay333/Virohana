const API_KEY = '2de08d84d6mshe42000c4198117fp11fd31jsn1927a808992d'; // Replace 'YOUR_RAPIDAPI_KEY_HERE' with your actual RapidAPI key

function fetchDoctorsNearUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function successCallback(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            displayDoctors(response.data); // Call a function to display the data
        }
    });
    const url = `http://localhost:3000/api/search?query=Doctors&lat=${lat}&lng=${lng}`; // Change the URL to point to your proxy server
    xhr.open('GET', url);
    xhr.send();
}

function errorCallback(error) {
    console.error('Error occurred while fetching location:', error);
    // Handle errors, maybe display a message to the user
}

function handleResponse(response) {
    if (response && response.data) {
        displayDoctors(response.data); // Call displayDoctors only if response.data is defined
    } else {
        console.error('Invalid response format:', response);
    }
}


function displayDoctors(doctors) {
    const doctorsList = document.getElementById('doctors-list');
    doctorsList.innerHTML = ''; // Clear previous content

    if (Array.isArray(doctors)) {
        doctors.forEach(doctor => {
            const doctorElement = document.createElement('div');
            doctorElement.textContent = doctor.name; // Assuming 'name' is one of the properties of each doctor
            doctorsList.appendChild(doctorElement);
        });
    } else {
        console.error('Invalid response format or no doctors found:', doctors);
    }
}


// Call the function to fetch doctors near user's location when the page loads
fetchDoctorsNearUserLocation();
