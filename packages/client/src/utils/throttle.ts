export function throttle(callback: any, wait: number, context: any) {
  let isCooldown = false;

  let lastArguments: any;

  return () => {
    if (isCooldown) {
      lastArguments = arguments;
      return;
    }

    callback.apply(context, arguments);

    isCooldown = true;

    setTimeout(() => {
      isCooldown = false;

      if (lastArguments) {
        callback.apply(context, lastArguments);
      }
    }, wait);
  };
}
