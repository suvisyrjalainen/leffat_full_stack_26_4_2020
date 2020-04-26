
async function hae_elokuva(){
  var leffan_nimi = document.getElementById("leffa").value;
  var vuosi = document.getElementById("vuosi").value;
  var posteri = document.getElementById("leffan_posteri");

  var hakurimpsu = 'https://www.omdbapi.com/?t=' + leffan_nimi + '&y=' + vuosi +'&apikey=a95f3723';
  console.log(hakurimpsu);
  const response = await fetch(hakurimpsu);
  const data = await response.json();
  console.log(data);
  document.getElementById("elokuvan_nimi").innerHTML = data.Title;
  posteri.src = data.Poster;
}
