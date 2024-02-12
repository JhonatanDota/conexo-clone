export function randomizeIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

export function wait(callback: () => void, time: number): void{
  setTimeout(() => {
    callback()
  }, time);
}