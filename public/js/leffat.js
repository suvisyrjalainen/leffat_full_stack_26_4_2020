var leffan_title = "";

hae_arvostelut();

async function hae_arvostelut(){
  const response = await fetch("/api/arvostelut");
  const data = await response.json();
  console.log(data);
  tayta_taulukko(data);
}

function tayta_taulukko(data){

  var table = document.getElementById("arvostelutaulukko");

  for (var i = 0; i < data.length; i++) {

    var row = table.insertRow(i + 1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = data[i].leffa;
    cell2.innerHTML = data[i].arvostelu;
    cell3.innerHTML = data[i].arvostelija;
  }
}

function tyhjenna_arvostelutaulukko(){
  var table = document.getElementById("arvostelutaulukko");
  var rivien_maara = table.rows.length - 1;

  for (var i = 0; i < rivien_maara; i++) {
      table.deleteRow(1);
  }
}


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

  leffan_title = data.Title;
}

async function arvostele_elokuva(){
  var leffa = leffan_title;
  var arvostelu = document.getElementById("arvostelu").value;;
  var arvostelija = document.getElementById("arvostelija").value;;

  const data = {leffa, arvostelu, arvostelija};
  const options = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
       },
       body: JSON.stringify(data)
   };
fetch('/api/arvostele', options).then(function(response) {
      if(response.status == 200){
        console.log("ok");
        tyhjenna_arvostelutaulukko();
        hae_arvostelut();
      }
    }, function(error){
      console.log(error.message);
    });
}
