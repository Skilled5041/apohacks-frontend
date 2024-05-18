<script lang="ts">
	import { onMount } from "svelte";

	let media: Blob[] = [];
	let mediaRecorder: MediaRecorder | null = null;
	let recording = false;

	const sendFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		const response = await fetch("http://127.0.0.1:8000/uploadfile/", {
			method: "POST",
			body: formData
		});
		const data = await response.json();
		console.log(data);
	};

	onMount(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.ondataavailable = (e) => media.push(e.data);
		mediaRecorder.onstop = () => {
			const audio = document.querySelector("audio");
			const blob = new Blob(media, { type: "audio/ogg; codecs=opus" });
			if (audio?.src) {
				audio.src = window.URL.createObjectURL(blob);
			}
			sendFile(new File([blob], "audio.ogg"));
		};
	});
	const startRecording = () => {
		media = [];
		mediaRecorder?.start();
		recording = true;
	};
	const stopRecording = () => {
		mediaRecorder?.stop();
		recording = false;
	};
</script>

<div class="text-center p-12">
	<h1 class="text-8xl pb-12"><span class="gradient-heading"></span> ️</h1>
	{#if recording}
		<button class="btn variant-filled" on:click={stopRecording}>Stop</button>
	{:else}
		<button class="btn variant-filled" on:click={startRecording}>Record</button>
	{/if}


</div>

<style>
	.gradient-heading {
		@apply bg-clip-text text-transparent box-decoration-clone;
		/* Direction */
		@apply bg-gradient-to-br;
		/* Color Stops */
		@apply from-primary-500 via-secondary-500 to-tertiary-500;
	}
</style>
