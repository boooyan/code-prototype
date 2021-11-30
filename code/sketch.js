let video;
let pose;
//let img1;
//let img2;
let skeleton;
let angle=0;
let song;
let leftWristX;
let leftWristY;
let rightWristX;
let rightWristY;
let eye1X=0;
let eye1Y=0;


function setup() {
	
	b = new Ball();
    
   
      createCanvas(windowWidth,windowHeight);
    song=loadSound('qs4.wav');
        noStroke();    
        video = createCapture(VIDEO);
        video.size(width,height);    
   
        poseNet = ml5.poseNet(video, modelLoaded);
   
        poseNet.on('pose', gotPoses) 
          
        video.hide(); 

        
        angleMode(DEGREES);
       
    
}


function modelLoaded(){
        console.log("modelLoaded function has been called so this work!!!!");
};



function gotPoses(poses){
    //console.log(poses);
        if( poses.length > 0 ){
            pose = poses[0].pose;
            skeleton = poses[0].skeleton; 
        } 
    leftWristX=poses[0].pose.leftWrist.x
    leftWristY=poses[0].pose.leftWrist.y
     rightWristX=poses[0].pose.rightWrist.x
    rightWristY=poses[0].pose.rightWrist.y
    
    
} 


//}

function draw() {
            
    
    image(video, 0, 0,width,height);
  
    filter(THRESHOLD);
    
        
    
    if(pose){
      
            let history = [];
            let nx = pose.nose.x;
            let ny = pose.nose.y;
            let d = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x,pose.rightEye.y);
          if(pose){
            fill(255,0,0);
           noStroke(); ellipse(pose.nose.x,pose.nose.y,d);
           noStroke();  
           fill(0,0,205); ellipse(pose.leftEye.x,pose.leftEye.y,50,50);
          ellipse(pose.rightEye.x,pose.rightEye.y,50,50);
    
        }
        if(leftWristY<250){
            if(!song.isPlaying()){
                song.play()
            }
        }
          if(rightWristY<250){
            if(!song.isPlaying()){
                song.play()
            }
        }
            
            let v = createVector(nx,ny);
            
            history.push(v);
            
             console.log("history.length  " + history.length);
        
            if(history.length > 150){
           history.splice(0,1);
            
                
            }
        
            for(let i = 0; i < history.length; i++){
            
            let pos = history[i];
           
               noStroke();
            fill(255,255,255);
           
            
        }
            
        
 
        for(let i=0; i < pose.keypoints.length;i++){
     
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
    
      noStroke();
        ellipse(x,y,15,15);
    
        for(let i = 0; i < skeleton.length; i++){
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(5);
            stroke(255,255,0);
            line(a.position.x, a.position.y,b.position.x, b.position.y );
            fill(255,0,0);
        
        }    
    }
}  
}
