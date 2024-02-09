import useFitText, { TOptions } from "use-fit-text";

export function randomizeIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

export function useBetterFitText(options?: TOptions) {
  const { ref, fontSize } = useFitText({
    ...options,
    onFinish: (finishedFontSize: number) => {
      if (options?.onFinish) options?.onFinish(finishedFontSize);
    },
  });
  return { ref, fontSize };
}
