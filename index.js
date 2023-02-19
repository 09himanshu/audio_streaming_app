console.log('Hello Himanshu');

let audioelement = new Audio('/audio/ep1.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myProgressBar');
let gifImage = document.getElementById('gif');
let audioname = document.getElementsByClassName('audioname');
let audioItem = Array.from(document.getElementsByClassName('songItem'));
let audioTitle = document.getElementById('audioTitle');

let songs = [
    {audio: 'Episode 1', filePath: '/audio/ep1.mp3', coverPath: '/images/btth.jpg'},
    {audio: 'Episode 2', filePath: '/audio/ep2.mp3', coverPath: '/images/btth.jpg'},
    {audio: 'Episode 3', filePath: '/audio/ep3.mp3', coverPath: '/images/btth.jpg'},
    {audio: 'Episode 4', filePath: '/audio/ep4.mp3', coverPath: '/images/btth.jpg'},
    {audio: 'Episode 5', filePath: '/audio/ep5.mp3', coverPath: '/images/btth.jpg'},
    {audio: 'Episode 6', filePath: '/audio/ep6.mp3', coverPath: '/images/btth.jpg'}
]


audioItem.forEach((ele,i) => {
    ele.getElementsByTagName('img')[0] = songs[i].coverPath;
    ele.getElementsByTagName('h3')[0].innerText = songs[i].audio
})

// Listen on events

masterPlay.addEventListener('click', () => {
    let audio_item = new Audio(songs[0].filePath);
    if(audioelement.paused || audioelement.currentTime <= 0) {
        audio_item.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gifImage.style.opacity = 1;
    } else {
        audio_item.pause();
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play');
        gifImage.style.opacity = 0;
    }
    
})


audioelement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = ((myprogressbar.value*audioelement.duration)/100)
})

function change_audio() {
    Array.from(document.getElementsByClassName('audioIndex')).forEach(ele => {
        ele.classList.remove('fa-pause');
        ele.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('audioIndex')).forEach((ele, i) => {
    ele.addEventListener('click', (e) => {
        change_audio();
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioelement.src = songs[i].filePath;
        audioelement.currentTime = 0;
        audioelement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        audioTitle.innerText = songs[i].audio
    })
})

document.getElementById('forward').addEventListener('click', () => {
    if(songIndex >= 5) {
        songIndex = 0;
    } else {
        songIndex +=1;
    }
    audioelement.src = songs[songIndex].filePath;
    audioelement.currentTime = 0;
    audioelement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    audioTitle.innerText = songs[songIndex].audio
})

document.getElementById('backword').addEventListener('click', () => {
    if(songIndex <= 0) {
        songIndex = songs.length-1;
    } else {
        songIndex -= 1;
    }
    audioelement.src = songs[songIndex].filePath;
    audioelement.currentTime = 0;
    audioelement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    audioTitle.innerText = songs[songIndex].audio;
})