<script lang="ts">
	import { onMount } from "svelte";
	import VideoStream from "$lib/components/VideoStream.svelte";
	import zombieGif from "$lib/gifs/zombie.gif";
	import j1 from "$lib/images/j1.png";
	import j2 from "$lib/images/j2.png";
	import j3 from "$lib/images/j3.png";
	import j4 from "$lib/images/j4.png";
	const scrollIntoView = ({ target }: any) => {
		const el = document.querySelector(target.getAttribute("href"));
		if (!el) return;
		el.scrollIntoView({
			behavior: "smooth"
		});
	};

	type Mode = "humanToZombie" | "zombieToHuman";
	let currentMode: Mode = "humanToZombie";

	const changeMode = () => {
		currentMode = currentMode === "humanToZombie" ? "zombieToHuman" : "humanToZombie";
	};

	let camera: VideoStream;
	let media: Blob[] = [];
	let mediaRecorder: MediaRecorder | null = null;
	let recording = false;

	const sendFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		const response = await fetch("http://localhost:8000/upload_audio/", {
			method: "POST",
			body: formData
		});
		const data = await response.json();
		console.log(data);
	};

	let volume: number = 0;

	onMount(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.ondataavailable = (e) => media.push(e.data);

		const audioContext = new AudioContext();
		const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
		const analyserNode = audioContext.createAnalyser();
		mediaStreamAudioSourceNode.connect(analyserNode);

		const pcmData = new Float32Array(analyserNode.fftSize);
		const onFrame = () => {
			analyserNode.getFloatTimeDomainData(pcmData);
			let sumSquares = 0.0;
			for (const amplitude of pcmData) {
				sumSquares += amplitude * amplitude;
			}
			volume = Math.sqrt(sumSquares / pcmData.length);
			window.requestAnimationFrame(onFrame);
		};
		window.requestAnimationFrame(onFrame);
	});
	const startRecording = () => {
		media = [];
		mediaRecorder?.start();
		camera.takepicture();
		recording = true;
	};
	const stopRecording = () => {
		mediaRecorder?.stop();
		recording = false;
	};

	$: if (volume) {
		const recordButton = document.getElementById("record-button");
		if (recordButton) {
			recordButton.style.transform = `rotate(${volume * 360}deg) perspective(100px) rotateX(${volume * 36}deg) rotateY(${volume * 36}deg)`;
			recordButton.style.outlineWidth = `${volume * 1000}px`;
		}
	}

</script>

<div class="flex justify-center">
	<img src={zombieGif} alt="walking zombie">
</div>
<div class="flex justify-center pt-24">
	<a class="btn variant-filled-tertiary" href="#down" on:click|preventDefault={scrollIntoView}>
		<span class="icon-[ph--arrow-fat-down-fill]" style="width: 32px; height: 32px;" href="#down" on:click|preventDefault={scrollIntoView}/>
	</a>
</div>
<div class="p-96" />
<div class="py-12 flex flex-col items-center justify-between">
	{#key currentMode}
		<div class="flex flex-col">
			<h1
				id="down"
				class:gradient-heading1={currentMode === "humanToZombie"}
				class:gradient-heading2={currentMode === "zombieToHuman"}
				class="text-6xl text-center gradient-heading1 font-extrabold pb-8">
				{currentMode === "humanToZombie" ? "Human To Zombie" : "Zombie To Human"}
			</h1>

			<button class="btn variant-filled-tertiary mb-12 whitespace-break-spaces"
					on:click={changeMode}>{currentMode === "humanToZombie" ? "Human To Zombie" : "Zombie To Human"}
				<span
					class="icon-[ph--swap]" style="width: 32px; height: 32px;"></span></button>
		</div>
	{/key}

	<div class="border-green-700 border-8 mb-12">
		<VideoStream bind:this={camera} />
	</div>
	<div class="flex justify-center w-[40%]">
		{#if recording}
			<button
				id="record-button"
				class="transition stack w-80 bg-black text-white h-24 rounded-3xl inline-flex justify-center items-center outline outline-2 outline-red-600"
				style="--stacks: 3;" on:click={stopRecording}>
				<span class="py=8" style="--index: 0;">Stop</span>
				<span class="py-8" style="--index: 1;">Stop</span>
				<span class="py-8" style="--index: 2;">Stop</span>
			</button>
		{:else}
			<button
				class="hover-effect stack w-80 bg-black text-white h-24 rounded-3xl inline-flex justify-center items-center outline outline-2 outline-white"
				style="--stacks: 3; margin-top: 20px; margin-bottom:20px" on:click={startRecording}>
				<span class="py=8" style="--index: 0;">Record</span>
				<span class="py-8" style="--index: 1;">Record</span>
				<span class="py-8" style="--index: 2;">Record</span>
			</button>
		{/if}
	</div>
</div>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Danfo&family=Inter:wght@100..900&display=swap" rel="stylesheet">

<style>
    * {
        font-family: Inter, sans-serif;
    }

    :root {
        --background: #060608;
        --color: #FAFAFA;
        --color-background: #31037d;
        --axis-x: 1px;
        --axis-y: 1rem;
        --delay: 10;
        --color-black: #000;
        --color-white: #fff;
        --color-orange: #d49c3d;
        --color-red: #d14b3d;
        --color-violet: #cf52eb;
        --color-blue: #44a3f7;
        --color-green: #5acb3c;
        --color-yellow: #debf40;
        --color-foreground: var(--color-white);
        --font-name: Righteous;
    }

    .hover-effect {
        transition: all 0.3s;
    }

    .transition {
        transition: all 0.3s;
    }

    .hover-effect:hover {
        transform: scale(1.05) rotate(2deg) perspective(100px) rotateX(2deg);
    }

    .c-rainbow {
        counter-reset: rainbow;
        position: relative;
        display: block;
        list-style: none;
    }

    .c-rainbow__layer {
        position: absolute;
        top: 0;
        --text-color: var(--color-foreground);
        counter-increment: rainbow;
        font-size: 6rem;
        color: var(--text-color);
        text-shadow: -1px -1px 0 var(--color-black), 1px -1px 0 var(--color-black), -1px 1px 0 var(--color-black), 1px 1px 0 var(--color-black), 4px 4px 0 rgba(0, 0, 0, .2);
        animation: rainbow 1.5s ease-in-out infinite;
    }

    .c-rainbow__layer:nth-child(1) {
        animation-delay: calc(1 / var(--delay) * 1s);
        left: calc(var(--axis-x) * 1);
        z-index: -10;
    }

    .c-rainbow__layer:nth-child(2) {
        animation-delay: calc(2 / var(--delay) * 1s);
        left: calc(var(--axis-x) * 2);
        z-index: -20;
    }

    .c-rainbow__layer:nth-child(3) {
        animation-delay: calc(3 / var(--delay) * 1s);
        left: calc(var(--axis-x) * 3);
        z-index: -30;
    }

    .c-rainbow__layer:nth-child(4) {
        animation-delay: calc(4 / var(--delay) * 1s);
        left: calc(var(--axis-x) * 4);
        z-index: -40;
    }

    .c-rainbow__layer:nth-child(5) {
        animation-delay: calc(5 / var(--delay) * 1s);
        left: calc(var(--axis-x) * 5);
        z-index: -50;
    }

    .c-rainbow__layer:nth-child(6) {
        animation-delay: calc(6 / var(--delay) * 1s);
        left: calc(var(--axis-x) * 6);
        z-index: -60;
    }

    .c-rainbow__layer:nth-child(7) {
        animation-delay: calc(7 / var(--delay) * 1s);
        left: calc(var(--axis-x) * 7);
        z-index: -70;
    }

    .c-rainbow__layer--white {
        --text-color: var(--color-white);
    }

    .c-rainbow__layer--orange {
        --text-color: var(--color-orange);
    }

    .c-rainbow__layer--red {
        --text-color: var(--color-red);
    }

    .c-rainbow__layer--violet {
        --text-color: var(--color-violet);
    }

    .c-rainbow__layer--blue {
        --text-color: var(--color-blue);
    }

    .c-rainbow__layer--green {
        --text-color: var(--color-green);
    }

    .c-rainbow__layer--yellow {
        --text-color: var(--color-yellow);
    }

    @keyframes rainbow {
        0%, 100% {
            transform: translatey(var(--axis-y)) translateX(-50%);
            left: 50%;
        }
        50% {
            transform: translatey(calc(var(--axis-y) * -1)) translateX(-50%);
            left: 50%;
        }
    }

    .stack {
        display: grid;
        grid-template-columns: 1fr;
    }

    .stack span {
        font-weight: bold;
        grid-row-start: 1;
        grid-column-start: 1;
        font-size: 3rem;
        --stack-height: calc(100% / var(--stacks) - 1px);
        --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
        --clip-top: calc(var(--stack-height) * var(--index));
        --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
        clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
        animation: stack 340ms cubic-bezier(.46, .29, 0, 1.24) 1 backwards calc(var(--index) * 120ms), glitch 2s ease infinite 2s alternate-reverse;
    }

    .stack span:nth-child(odd) {
        --glitch-translate: 8px;
    }

    .stack span:nth-child(even) {
        --glitch-translate: -8px;
    }

    @keyframes stack {
        0% {
            opacity: 0;
            transform: translateX(-50%);
            text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
        }
        60% {
            opacity: 0.5;
            transform: translateX(50%);
        }
        80% {
            transform: none;
            opacity: 1;
            text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
        }
        100% {
            text-shadow: none;
        }
    }

    @keyframes glitch {
        0% {
            text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
            transform: translate(var(--glitch-translate));
        }
        2% {
            text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
        }
        4%, 100% {
            text-shadow: none;
            transform: none;
        }
    }

    .gradient-heading1 {
        @apply bg-clip-text text-transparent box-decoration-clone;
        /* Direction */
        @apply bg-gradient-to-br;
        /* Color Stops */
        @apply from-primary-500 via-tertiary-500 to-secondary-500;
    }

    .gradient-heading2 {
        @apply bg-clip-text text-transparent box-decoration-clone;
        /* Direction */
        @apply bg-gradient-to-br;
        /* Color Stops */
        @apply from-secondary-700 via-tertiary-500 to-primary-500;
    }
</style>
