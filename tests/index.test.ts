import {PerfTimer} from "../src/index"

test("Functioning Constructor", () => {
	const timer = new PerfTimer();
	expect(timer).toBeInstanceOf(PerfTimer);
});