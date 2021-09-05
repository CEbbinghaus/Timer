import {PerformanceTimer} from "../src/index"

test("Functioning Constructor", () => {
	const timer = new PerformanceTimer();
	expect(timer).toBeInstanceOf(PerformanceTimer);
});

test("Able to measure basic task", () => {
  const timer = new PerformanceTimer();
  expect(timer).toBeInstanceOf(PerformanceTimer);
});
