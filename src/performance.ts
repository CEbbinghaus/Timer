//@ts-ignore performance is defined in browser so we need to act as if it might be already existing
// we need to use require for runtime sake
//eslint-disable-next-line
export const performance = (performance || require("perf_hooks").performance) as Performance;
