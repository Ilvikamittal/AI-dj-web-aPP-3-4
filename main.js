song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(550, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 550, 400);

    fill("#ff0000");
    stroke("00ee00");

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        inNumberleftWristY = Number(leftWristY);
        removeDecimals = floor(inNumberleftWristY);
        console.log(removeDecimals);

        volume = removeDecimals / 500;
        document.getElementById("volume").innerHTML = "Volume= " + volume;
        song.setVolume(volume);
    }

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("poseNet is initialized");

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWristX " + leftWristX + " leftWristY " + leftWristY);
        console.log("rightWristX " + rightWristX + " rightWristY " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;

    }
}