import useFitText, { TOptions } from "use-fit-text";

export function useBetterFitText(options?: TOptions) {
  const { ref, fontSize } = useFitText({
    ...options,
    onFinish: (finishedFontSize: number) => {
      if (options?.onFinish) options?.onFinish(finishedFontSize);
    },
  });
  return { ref, fontSize };
}
