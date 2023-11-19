import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const player = new Player('vimeo-player');

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  const currentTimeOfVideoplayer = data.seconds;
  localStorage.setItem(STORAGE_KEY, currentTimeOfVideoplayer);
}

const getCurrentTimeOfVideoplayer = Number(localStorage.getItem(STORAGE_KEY));

player.setCurrentTime(getCurrentTimeOfVideoplayer);
