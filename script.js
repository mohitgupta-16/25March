const btn = document.querySelector(".get");
const map = document.getElementById("map");
const rmvbtn = document.querySelector(".remove");

function renderMap(coordinates) {
    const { latitude, longitude } = coordinates;

    map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;

    rmvbtn.classList.add("active");
    btn.classList.add("not-active");

    console.log("first");
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("No Geolocation Support Availaible");
    }
}

function showPosition(position) {
    const userCoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };

    localStorage.setItem("user-Coordinates", JSON.stringify(userCoordinates));

    renderMap(userCoordinates);
}

const userCoordinates = JSON.parse(localStorage.getItem("user-Coordinates"));
if (userCoordinates) {
    renderMap(userCoordinates);
    btn.classList.add("not-active");
    console.log("second");
}

btn.addEventListener("click", getLocation);

rmvbtn.addEventListener("click", () => {
    localStorage.removeItem("user-Coordinates");

    map.innerHTML = "";
    rmvbtn.classList.remove("active");
    btn.classList.remove("not-active");
});
