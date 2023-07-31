<script lang="ts">
	export let min;
	export let max;
	export let value;
	let playing = false;
	
	const playAnimation = () => {
		playing = true;
		const startTime = Date.now();
		const duration = 3000;
		const range = max - min;
		const nextFrame = () => {
			const elapsed = Date.now() - startTime;
			const t = Math.min(1, elapsed / duration);
			value = min + Math.floor(t * range);
			if (t < 1 && playing) {
				requestAnimationFrame(nextFrame);
			} else {
				playing = false;
			}
		};
		nextFrame();
	};
	const onClickButton = () => {
		if (playing) playing = false;
		else playAnimation();
	};
</script>

<input type="range" disabled={playing} {min} {max} step={1} bind:value />
<button on:click={onClickButton}><img src={!playing ? "/assets/play.png"  : "/assets/stop.png"} /></button>

<style>
	input {
		width: 250px;
		margin: 0;
		pointer-events: all;
	}
	button {
		padding: 0;
		margin: 0;
		font-size: 30px;
		line-height: 0;
		pointer-events: all;

	}

	img {
		width: 20px;
		height: 20px;
	}
</style>