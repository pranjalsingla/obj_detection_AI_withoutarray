video = "";
status1 = "";

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);
    if(status1 != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0; i < results.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are - "+results.length;

            fill("#d9370b");
            percent = floor(results[i].confidence*100);
            text(results[i].label+" "+percent+"%", results[i].x+15, results[i].y+15);
            noFill();
            stroke("#5f7505");
            rect(results[i].x,results[i].y,results[i].width,results[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded(){
    console.log("COCOSSD model is loaded");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    }
}