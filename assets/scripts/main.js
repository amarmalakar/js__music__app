"use strict"

const filterOption = document.querySelector('#filterOption');
const music__list = document.querySelector('.music__list');

const play = document.querySelector('#play');
const music = document.querySelector('#music');
const music__app_lineAnimation = document.querySelector('.music__app-lineAnimation');
const music__rythm__animation = document.querySelector('.music__rythm__animation');
const music__app__title = document.querySelector('#music__app-title');
const music__app__txt = document.querySelector('#music__app-txt');
const totalTime = document.querySelector('#totalTime');
const currTime = document.querySelector('#currTime');
const progressBar = document.querySelector('#progressBar');
const progress = document.querySelector('#progress');
let isPlaying = false;

// Create Categories Options
const musicCategories = [
    ...new Set(
        musicArray.map((cat) => {
            return cat.category
        })
    )
]
const musicCategoryOptions = musicCategories.map(cat => {
    return `<option value="${cat}">${cat}</option>`
})
filterOption.innerHTML += musicCategoryOptions;

// 
const filterMusic = (e) => {
    music__list.innerHTML = ``
    if (e.value === 'all') {
        musicArray.map(allMusic => {
            music__list.innerHTML += `
                <button
                    onclick="playTheMusic(
                        '${allMusic.src}',
                        '${allMusic.title}',
                        '${allMusic.txt}',
                        '${allMusic.dec}'
                    )"
                >${allMusic.title}</button>
            `
        })
    } else {
        musicArray.filter(filteredMusic => {
            if (filteredMusic.category === e.value) {
                // console.log(filteredMusic);
                music__list.innerHTML += `
                    <button
                        onclick="playTheMusic(
                            '${filteredMusic.src}',
                            '${filteredMusic.title}',
                            '${filteredMusic.txt}',
                            '${filteredMusic.dec}'
                        )"
                    >${filteredMusic.title}</button>
                `
            }
        })
    }
}

// play music
const playTheMusic = (src, title, txt, dec) => {
    music.src = `media/music/${src}`;
    music__app__title.innerText = title;
    music__app__txt.innerText = txt;
    playMusic();
}
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    music__app_lineAnimation.style.display = 'flex';
    music__rythm__animation.style.display = 'block';
}
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    music__app_lineAnimation.style.display = 'none';
    music__rythm__animation.style.display = 'none';
}
play.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
})

music.addEventListener('ended', pauseMusic);

// progress bar control
music.addEventListener('timeupdate', (e) => {
    const {currentTime, duration} = e.srcElement;
    // console.log(duration);

    // find total duration
    let tot_min = Math.floor(duration / 60); // converting into minutes
    let tot_sec = Math.floor(duration % 60); // converting into seconds
    if (tot_sec < 10) {
        tot_sec = `0${tot_sec}`;
    }
    if (duration) {
        totalTime.innerText = `${tot_min}:${tot_sec}`;
    }

    // find current time
    let curr_min = Math.floor(currentTime / 60);
    let curr_sec = Math.floor(currentTime % 60);
    if (curr_sec < 10) {
        curr_sec = `0${curr_sec}`;
    }
    if (currentTime) {
        currTime.innerText = `${curr_min}:${curr_sec}`;
    }

    // get width of progress bar
    progress.style.width = `${(currentTime / duration) * 100}%`;
})

progressBar.addEventListener('click', (e) => {
    // console.log(e.offsetX);
    // console.log(e.srcElement.clientWidth);
    const { duration } = music;
    music.currentTime = (e.offsetX / e.srcElement.clientWidth) * duration;
})