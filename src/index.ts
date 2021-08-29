import {performance} from "./performance"


class LappedWatch
{
	startTime: number = performance.now();
	// Time since the last "lap"
	lastTime: number = null;

	constructor(){
		this.lastTime = this.startTime;
	}

	Lap(): number {
		const currentTime = performance.now();
		var diff = currentTime - this.lastTime;
		this.lastTime = currentTime;
		return diff;
	}

	Finalize(): number {
		const currentTime = performance.now();
		var total = currentTime - this.startTime;
		return total;
	}
}

export class PerformanceTimer {
	
	private stopwatches: Array<LappedWatch> = [];
	private log = "";

	private get TotalStopwatches(): number{
		return this.stopwatches.length;
	}
	
	private get LastWatch(): LappedWatch{
		return this.stopwatches[this.TotalStopwatches - 1];
	}
	
	private get TabLevel(): string{
		return "\t".repeat(this.TotalStopwatches);
	} 

	public StartTimer(name: string): void{
		this.log += `${this.TabLevel}${name}:\n`;
		this.stopwatches.push(new LappedWatch ());
	}

	public StopTimer(): void{
		if (this.TotalStopwatches <= 0)
			return;

		var isLast = this.TotalStopwatches == 1;

		var indenting = isLast ? "" : this.TabLevel;

		this.log += `${indenting}Total: ${this.LastWatch.Finalize()}ms\n`

		this.stopwatches.splice(this.TotalStopwatches - 1, 1);

		if (isLast){
			console.log(this.log);
		}else
			this.LastWatch.Lap();
	}

	public Log(name: string): void
	{
		this.log += `${this.TabLevel}${name}: ${this.LastWatch.Lap()}ms\n`;
	}

	public Finish(): void
	{
		while (this.TotalStopwatches > 0)
			this.StopTimer();
	}
}

export class StaticTimer
{
	private static instance: PerformanceTimer = new PerformanceTimer();

	public static StartTimer(name: string): void
	{
		this.instance.StartTimer(name);
	}

	public static StopTimer(): void
	{
		this.instance.StopTimer();
	}

	public static Log(name: string): void
	{
		this.instance.Log(name);
	}

	public static Finish(): void
	{
		this.instance.Finish();
	}
}