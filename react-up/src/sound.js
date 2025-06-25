import { Howl } from 'howler';

const playSound = (src) => {
  const sound = new Howl({
    src: [src],
    volume: 0.5,
  });
  sound.play();
};

export default playSound;
