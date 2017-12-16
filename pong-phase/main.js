const ctx = new AudioContext();

const pong = () => {
  const startFreq = 160;
  const endFreq = 20;
  const sustain = 0.01;
  const release = 0.2;
  const decay = 0.5;

  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  oscillator.frequency.setValueAtTime(startFreq, now);
  oscillator.frequency.exponentialRampToValueAtTime(endFreq, now + decay);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(sustain, now + decay);

  oscillator.start(now);
  oscillator.stop(now + 1);

  gain.connect(ctx.destination);
  oscillator.connect(gain);
};

new Array(5).fill(200).reduce((previous, _) => {
  const current = previous * 1.001;
  setInterval(pong, current);
  return current;
});
