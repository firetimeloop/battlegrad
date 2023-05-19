export function throttle(
  callback: (...args: any[]) => any,
  wait: number,
  context: any,
): (...args: any[]) => any {
  let isCooldown = false;

  let lastArguments: any;

  return (...args: any[]) => {
    if (isCooldown) {
      lastArguments = args;
      return;
    }

    callback.apply(context, args);

    isCooldown = true;

    setTimeout(() => {
      isCooldown = false;

      if (lastArguments) {
        callback.apply(context, lastArguments);
      }
    }, wait);
  };
}
