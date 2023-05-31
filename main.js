objects=[];
status="";
function setup(){
    canvas= createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480, 380);
    video.hide()
}
function start(){
    Nome_do_Objeto=document.getElementById("caixaDetexto").value;
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detectando Objetos";
}
function modelLoaded(){
    console.log("Modelo Carregado!")
    status= true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
    }
    function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objetos Detectados";
            document.getElementById("numberOfObjects").innerHTML="Quantidade de Objetos Detectados: "+ objects.length;
            fill("#FF0000");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent + "%", objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label==Nome_do_Objeto){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("objectStatus").innerHTML= Nome_do_Objeto+"Encontrado";
                synth=window.SpeechSynthesisUtterance(Nome_do_Objeto + "Encontrado");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objectStatus").innerHTML= Nome_do_Objeto+" Não Encontrado";
            }
        }
    }
    }