function openCity(cityName) {
    var i, tabcontent, tablinks;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tabdetails").innerHTML =this.responseText;
        }
    };
    xhttp.open("GET", "/"+cityName, true);
    xhttp.send();
}

