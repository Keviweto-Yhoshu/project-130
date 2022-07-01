going_bad =" ";
goodbyes=" ";

scoreLeftWrist = "0";
scoreRightWrist = "0";
SongStatus = "going_bad.mp3";
SongStat = "goodbyes.mp3";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function setup(){
    canvas  = createCanvas(500 , 425);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(500,425);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload(){
    going_bad= loadSound("going_bad.mp3");
    goodbyes= loadSound("goodbyes.mp3");

}

function modelLoaded(){
    console.log("Posenet is initialised");
}

function draw(){
    image(video, 0, 0, 500, 400);

    fill("#FF0000");
    stroke("#FF0000");

    SongStatus = going_bad.isPlaying();
    console.log(SongStatus)

    if(scoreLeftWrist >0.2){
        circle(leftWristX, leftWristY, 20);
        goodbyes.stop();
     
    if(SongStatus == false ){
       going_bad.play();
       document.getElementById("song_name").innerHTML = "Song Name : Going Bad";
    }

    SongStat = goodbyes.isPlaying();
    console.log(SongStat);
 
        if(scoreRightWrist < 0.2){
            circle(rightWristX, rightWristY, 20);
           going_bad.stop();
        }

        if(SongStatus == true){
            goodbyes.play();
            document.getElementById("song_name").innerHTML = "Song Name : GoodByes";
        }
    
}
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreLeftWrist = results[0].pose.keypoints[10].score;
        console.log(scoreLeftWrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.lefttWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

