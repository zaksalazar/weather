function GetInfo(){
    const newName = document.getElementById('cityInput');
    const cityName = document.getElementById('cityyName');
    cityName.innerHTML = "--"=newName.value+"--";
}

fetch('https://api.openweathermap.org/data/2.5/?forcastq='+newName.value'&apiidf6f8a6a2cbbba34584a4bb54855b24f8')
.then(response => response.json())
.then(data =>{})
