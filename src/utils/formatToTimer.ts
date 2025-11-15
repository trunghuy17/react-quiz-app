/*
input: 30
output: 0:30s
*/

export const formatToTimer = (time: number) => {
  const minutes = Math.floor(time / 60);
  const second = time % 60;

  return `${minutes}:${second < 10 ? '0' : ''}${second}s`
}