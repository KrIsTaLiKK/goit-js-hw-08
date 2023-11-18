import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on(
  'timeupdate',
  throttle(function (data) {
    const currentTimeOfVideoplayer = data.seconds;
    localStorage.setItem('videoplayer-current-time', currentTimeOfVideoplayer);
  }, 1000)
);

const getCurrentTimeOfVideoplayer = Number(
  localStorage.getItem('videoplayer-current-time')
);

player.setCurrentTime(getCurrentTimeOfVideoplayer);
