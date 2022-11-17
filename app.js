const music = [
 {
  img:'djalil.jpg',
  song:'calm down',
  src:'calm.m4a',
  author:'djalil palemero',
 },{
  img:'overThink.jpg',
  song:'over thinking',
  src:'overThink.m4a',
  author:'lijeen hazert',
 },{
  img:'pat.jpeg',
  song:'sad turkish music',
  src:'sad.m4a',
  author:'mikle jakson',
 },{
  img:'turkish.jpg',
  song:'turkish instruments',
  src:'turkish.m4a',
  author:'donald tramp',
 }]

/*******Select Items *********/
const playBtn= document.querySelector('#play');
const audio = document.querySelector('audio');
const nextBtn = document.querySelector('.fa-forward');
const prevBtn= document.querySelector('.fa-backward');
const title = document.querySelector('.titleText');
const author = document.querySelector('.author');
const timeProgress=document.querySelector('.timeNow');
const fullTime = document.querySelector('.fullTime');
const increaseBtn=document.querySelector('.upContainer');
const decreaseBtn= document.querySelector('.downContainer');
const slider = document.querySelector('.slider');
const volumeSlider = document.querySelector('.volume');
const volumeBtn=document.querySelector('.fa-volume-high');
const speedBtn = document.querySelector('.speed');
const likeBtn = document.querySelector('.fa-heart');
const loopBtn=document.querySelector('.fa-shuffle');
const body = document.querySelector('main');
const btn = document.getElementById('btn');
const playList = document.querySelector('.playList');
const hideBtn = document.getElementById('hideBtn');
const songsContainer=document.querySelector('.main');
const playListBtn=document.querySelector('.playBtn');
/******* Add Event Listener ******/
playBtn.addEventListener('click',controlAudio)
nextBtn.addEventListener('click',nextSong)
window.addEventListener('DOMContentLoaded',initialSong);
prevBtn.addEventListener('click',previousSong);
increaseBtn.addEventListener('click',increaseTime);
decreaseBtn.addEventListener('click',decreaseTime);

slider.addEventListener('change',sliderChange);
volumeSlider.addEventListener('change',volumeChange);
volumeBtn.addEventListener('click',muteAudio);
speedBtn.addEventListener('click',speedChanger);
likeBtn.addEventListener('click',likeSong);
loopBtn.addEventListener('click',loop);
btn.addEventListener('click',showPlayList);
hideBtn.addEventListener('click',hidePlayList);
playListBtn.addEventListener('click',playPlayList);
playBtnName=document.querySelector('.btn-name')
/********** Functions ********/
//play and pause the audio;
function controlAudio(){
 if(playBtn.classList.contains('fa-circle-play')){
  playBtn.classList.replace('fa-circle-play','fa-circle-pause');
  audio.play();
 }else{
  audio.pause()
  playBtn.classList.replace('fa-circle-pause','fa-circle-play');
 }
 setTime()
};

// the first song to play; 
function initialSong(){
 displaySong(music,0);
 displayImage(music,0);
 speedBtn.textContent=`${audio.playbackRate}×`
}
//go to next song ; 
let i =0;
function nextSong(){
 i++;
 if(i>=music.length){
  i=0;
 }
  displaySong(music,i);
  displayImage(music,i);
 if(playBtn.classList.contains('fa-circle-pause')){
  audio.play()
 }
 
};
//go to previous Song;
function previousSong(){
 
 i--;
 
if(i<0){
 i=music.length-1;
}
 displaySong(music,i);
 displayImage(music,i);
 if(playBtn.classList.contains('fa-circle-pause')){
  audio.play();
 }
}


//display the songs ;
function displaySong(arr,n){
 audio.src=arr[n].src;
 title.textContent=arr[n].song;
 author.textContent=arr[n].author;
 checkStorage();
}
//displayThe Image;
function displayImage(arr,j){
 body.style.backgroundImage=`url(${arr[j].img})`
 
}

// setting the times;
function setTime(){
checkStorage()
const currentMoment= audio.currentTime;
const time = audio.duration;
if(!time || !currentMoment){
 timeProgress.innerHTML=calcTime(0);
 fullTime.innerHTML=calcTime(0);
}else{
timeProgress.innerHTML=calcTime(currentMoment)
fullTime.innerHTML=calcTime(time);

//when the song ends ;
if(currentMoment==time){
 if(loopBtn.classList.contains('fa-shuffle')){
 nextSong()
 }else{
  i--;
  nextSong()
 }
}
}
};
setInterval(setTime,1000);

//formating the time numbers ;
function format(target){
 if(target<10){
  return `0${target}`
 }else{
  return target
 }
}

// calculate the time ;
function calcTime(time){
 const oneHour= 60*60;
const hours = Math.floor(time/60/60);
const minutes = Math.floor((time%oneHour)/60);
const seconds= Math.floor(time%60);
 return `${format(hours)}:${format(minutes)}:${format(seconds)}`
};

//increase and decrease time functionality;
function increaseTime(){
 const realTime = audio.currentTime;
 audio.currentTime =realTime + 15;
 
};
function decreaseTime(){
 const realTime = audio.currentTime;
 audio.currentTime =realTime + 15;
 
};

//adjusting the slider ;
function sliderChange(){
 const value = +slider.value;
 const durationValue= audio.duration
 audio.currentTime= (value*durationValue)/100;
};

//voice slider ;
function volumeChange(){
 const value = volumeSlider.value ;
 audio.volume = value/100;
 if(value==0){
  audio.muted = true;
  volumeBtn.classList.replace('fa-volume-high','fa-volume-xmark')
 }else{
  audio.muted = false;
  if(volumeBtn.classList.contains('fa-volume-xmark')){
   volumeBtn.classList.replace('fa-volume-xmark','fa-volume-high')
  }
 };
};

//mute the audio functionality;
function muteAudio(){
 if(!audio.muted){
  audio.muted=true;
  volumeBtn.classList.replace('fa-volume-high','fa-volume-xmark');
  volumeSlider.value=0;
 }else{
  audio.muted = false;
  volumeBtn.classList.replace('fa-volume-xmark','fa-volume-high');
  volumeSlider.value=50;
  volumeChange()
 }
};


//speed changing functionalitity;
 let counter=3;
function speedChanger(){
 const speeds = [0.5,0.75,1,1.5,2];
 audio.playbackRate=speeds[counter];
 console.log(audio.playbackRate)
 counter++;
 if(counter>=speeds.length){
  counter=0;
 }
 speedBtn.textContent=`${audio.playbackRate}×`
};
// when liking the song ; 

function likeSong(){

 // setting the array initialy;
 let likedSongs;
 if(localStorage.songs){
     likedSongs=JSON.parse(localStorage.songs);
 }else{
     likedSongs=[];
 }
//adding new items to local storage;


if(likedSongs.length<=0){
 const item ={src:`${music[i].src}`,img:`${music[i].img}`,title:`${music[i].song}`,author:`${music[i].author}`  }
 likedSongs.push(item);
 
 
}else{
   newZbi=likedSongs.filter((song)=>{
     if(song.title==music[i].song){
      return song
     }
   });
   
  if(newZbi.length>0){
    likedSongs=likedSongs.filter((item)=>{
      if(item.title!==music[i].song){
        return item
      }
    });
    
    
  }else{
    const any ={src:`${music[i].src}`,img:`${music[i].img}`,title:`${music[i].song}`,author:`${music[i].author}`  }
 likedSongs.push(any);
 
  }
  
}
localStorage.setItem('songs',JSON.stringify(likedSongs)); 
checkStorage()
//pumping the heart ; 
if(checkStorage()){
likeBtn.classList.add('pumpHeart');
 setTimeout(()=>{
   likeBtn.classList.remove('pumpHeart')
 },1000)
}

}
//check for the color of like button;
function checkStorage(){
  let likedItems= JSON.parse(localStorage.getItem('songs'));
  if(likedItems){
  let newItems=likedItems.filter((likedItem)=>{
    if(likedItem.title==music[i].song){
      return likedItem
    }
    
  })
  if(newItems.length>0){
    likeBtn.style.color='red';
    return true
  }else{
    likeBtn.style.color='white';
    return false
    
  }
  }else{
    likeBtn.style.color='white'
     return false
  }
  
}

//loop and shuffle music ;

function loop(){
 if(loopBtn.classList.contains('fa-shuffle')){
  loopBtn.classList.replace('fa-shuffle','fa-share');
  
 }else{
  loopBtn.classList.replace('fa-share','fa-shuffle');
 }
}

//showing play list functionality;

function showPlayList(){
   
    playList.classList.add('showPlayList');
    if(playBtn.classList.contains('fa-circle-pause')){
    audio.pause()
  playBtn.classList.replace('fa-circle-pause','fa-circle-play');
    }
    getStorage()
    
};
     
//hiding play list functionality;
function hidePlayList(){
    playList.classList.remove('showPlayList');
    audio.pause();
    const target=playListBtn.firstElementChild;
    changingBtn(playBtnName,target,'fa-pause','fa-play','play');
};

//get playList data from locla storage;

function getStorage(){
  const storageData= JSON.parse(localStorage.getItem('songs'));
  if(storageData.length>0){
  
  console.log('i have data')
    const element = document.createElement('div');
   element.classList.add('songs-container')
    const playData= storageData.map((song)=>{
      return ` <div class='song'> <img src=${song.img} class="songImg">
  <div class="songInfo">
   <p class="songTitle">  ${song.title}</p>
   <p class="songAuthor">${song.author}</p>
  </div>
<i class="fa-solid fa-ellipsis-vertical"></i>
<div class='deleteLikedSong'>delete</div>
</div>

    ` }).join("");
    console.log(element);
    if(songsContainer.children.length>0){
      songsContainer.removeChild(songsContainer.firstElementChild)
    }
    element.innerHTML=playData;
    songsContainer.appendChild(element);
  
 //select delete btn;
 
const ellipsisBtns= songsContainer.querySelectorAll('.fa-ellipsis-vertical');
ellipsisBtns.forEach((ellipsisBtn,index)=>{
  ellipsisBtn.addEventListener('click',()=>{
    const deleteBtn=songsContainer.querySelectorAll('.deleteLikedSong')[index]
   
   if(deleteBtn.classList.contains('showDelete')){
     deleteBtn.classList.remove('showDelete')
   }else{
    deleteBtn.classList.add('showDelete')
   }
   //when clicking on deleteBtn;
  deleteBtn.addEventListener('click',()=>{
    console.log('hhhhh')
    const likedSongsArr=JSON.parse(localStorage.getItem('songs'));
    const newSongsArr=likedSongsArr.filter((song,idx)=>{
      if(idx!==index){
        return song
      }
    });
    localStorage.setItem('songs',JSON.stringify(newSongsArr))
   getStorage() 
  }) 
   
   
  })
})
  
  }else{
    //we don't have anything in playlist;
    songsContainer.innerHTML=`
    <h3 class='noValue'>Oops this play list is empty.</h3>
    `
  }
  
};
//playing the songs from play list ;
function playPlayList(){
  let l=0;
  
  //playing the first song ;

  const playListSongs=JSON.parse(localStorage.getItem('songs'));
  const target=playListBtn.firstElementChild;
  displayImage(playListSongs,l);
  displaySong(playListSongs,l)
  if(target.classList.contains('fa-pause')){
    audio.pause();
    changingBtn(playBtnName,target,'fa-pause','fa-play','play');
  }else{
  audio.play();
  changingBtn(playBtnName,target,'fa-play','fa-pause','pause');
  }
  
  
  if(audio.duration<=audio.currentTime){
    l++;
    audio.src=playListSongs[l].src;
    audio.play();
    if(l>=playListSongs.length-1){
      l= 0;
    }
  }
  
}
;

function changingBtn(parBtn,btn,st,nd,text){
  btn.classList.replace(st,nd);
  parBtn.textContent=text
}