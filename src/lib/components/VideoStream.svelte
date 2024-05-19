<script lang="ts">
	import { onMount } from "svelte";
	import type { ToastSettings } from "@skeletonlabs/skeleton";
	import { getToastStore } from "@skeletonlabs/skeleton";

	let stream: MediaStream;
	let videoRef: HTMLVideoElement;
	let canvasRef: HTMLCanvasElement;

	const apiurl = "http://localhost:8000/api/upload";

	let width = 0;    // We will scale the photo width to this
	let height = 0;     // This will be computed based on the input stream
	async function getStream() {
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false
			});
			videoRef.srcObject = stream;
		} catch (err) {
			console.error(err);
		}

		videoRef.addEventListener(
			"canplay",
			(ev) => {
				width = videoRef.offsetWidth;
				height = videoRef.offsetHeight;

				videoRef.setAttribute("width", width.toString());
				videoRef.setAttribute("height", height.toString());
				canvasRef.setAttribute("width", width.toString());
				canvasRef.setAttribute("height", height.toString());
				// }
			},
			false
		);
	}

	function clearphoto() {
		const context = canvasRef.getContext("2d") as CanvasRenderingContext2D;
		context.fillStyle = "#AAA";
		context.fillRect(0, 0, canvasRef.width, canvasRef.height);
	}

	export function takepicture() {
		const context = canvasRef.getContext("2d") as CanvasRenderingContext2D;
		if (width && height) {
			canvasRef.width = width;
			canvasRef.height = height;
			context.drawImage(videoRef, 0, 0, width, height);

			const base64Url = canvasRef.toDataURL("image/png");
			const request = async () => {
				const data = new FormData();
				data.append("image", base64Url);
				const response = await fetch(apiurl, {
					method: "GET",
					body: data
				});

				const result = await response.json();
				if (result.isZombie) {
					toastStore.trigger(isZombie);
				} else {
					toastStore.trigger(isHuman);
				}
				if (response.ok) {
					console.log("Success");
				} else {
					console.log("Failed");
				}
			};
			request();
		} else {
			clearphoto();
		}
	}

	onMount(() => {
		getStream();
	});

	const toastStore = getToastStore();


	const isZombie: ToastSettings = {
		message: "Zombie Detected! 🧟‍♂️"
	};

	const isHuman: ToastSettings = {
		message: "Human Detected! 👨‍🦳"
	};
</script>

<!-- <button class="rounded-sm bg-slate-600 text-white px-4 py-2" on:click={getStream}>Start Stream</button> -->
<video class="rounded-sm bg-white" width="640" height="480" autoplay={true} bind:this={videoRef} />
<canvas id="canvas" class="d-none h-0 w-0" bind:this={canvasRef}></canvas>