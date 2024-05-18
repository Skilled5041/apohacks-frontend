<script lang="ts">
	import { onMount } from "svelte";
    import VideoStream from "$lib/components/VideoStream.svelte";
    let media: Blob[] = [];
	let mediaRecorder: MediaRecorder | null = null;
    let recording = false;

	const sendFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		const response = await fetch("http://localhost:3000/upload", {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		console.log(data);
	};

    let volume: number = 0;

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
        const audioContext = new AudioContext();
        const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
        const analyserNode = audioContext.createAnalyser();
        mediaStreamAudioSourceNode.connect(analyserNode);

        const pcmData = new Float32Array(analyserNode.fftSize);
        const onFrame = () => {
            analyserNode.getFloatTimeDomainData(pcmData);
            let sumSquares = 0.0;
            for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }
            volume = Math.sqrt(sumSquares / pcmData.length);
            window.requestAnimationFrame(onFrame);
        };
        window.requestAnimationFrame(onFrame);
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


<div class="p-12 flex flex-col items-center">
	<h1 class="minecraft">test</h1>
	<VideoStream/>
	<div class="pt-12" />
	{#if recording}
		<button class="stack w-80 bg-black text-white h-24 rounded-3xl inline-flex justify-center items-center outline outline-2 outline-white" style="--stacks: 3;" on:click={startRecording}>
			<span class="py=8" style="--index: 0;">Stop</span>
			<span class="py-8" style="--index: 1;">Stop</span>
			<span class="py-8" style="--index: 2;">Stop</span>
		</button>
	{:else}
		<button class="stack w-80 bg-black text-white h-24 rounded-3xl inline-flex justify-center items-center outline outline-2 outline-white" style="--stacks: 3;" on:click={startRecording}>
			<span class="py=8" style="--index: 0;">Record</span>
			<span class="py-8" style="--index: 1;">Record</span>
			<span class="py-8" style="--index: 2;">Record</span>
		</button>
	{/if}
	<meter id="volumeMeter" high={0.25} max={1} value={volume}></meter>
</div>

<div class="p-12">
	<br>
	<br>
	<br>
	<br>
	<ul class="c-rainbow">
		<li class="c-rainbow__layer c-rainbow__layer--white">MOAN TO SPEECH</li>
		<li class="c-rainbow__layer c-rainbow__layer--orange">MOAN TO SPEECH</li>
		<li class="c-rainbow__layer c-rainbow__layer--red">MOAN TO SPEECH</li>
		<li class="c-rainbow__layer c-rainbow__layer--violet">MOAN TO SPEECH</li>
		<li class="c-rainbow__layer c-rainbow__layer--blue">MOAN TO SPEECH</li>
		<li class="c-rainbow__layer c-rainbow__layer--green">MOAN TO SPEECH</li>
		<li class="c-rainbow__layer c-rainbow__layer--yellow">MOAN TO SPEECH</li>
	</ul>
</div>
<div class="p-12 flex flex-col items-center">
	<h1 class="minecraft">test</h1>
	<div class="pt-12" />
	{#if recording}
		<button class="hover-effect stack w-80 bg-black text-white h-24 rounded-3xl inline-flex justify-center items-center outline outline-2 outline-white" style="--stacks: 3;" on:click={stopRecording}>
			<span class="py=8" style="--index: 0;">Stop</span>
			<span class="py-8" style="--index: 1;">Stop</span>
			<span class="py-8" style="--index: 2;">Stop</span>
		</button>
	{:else}
		<button class="hover-effect stack w-80 bg-black text-white h-24 rounded-3xl inline-flex justify-center items-center outline outline-2 outline-white" style="--stacks: 3;" on:click={startRecording}>
			<span class="py=8" style="--index: 0;">Record</span>
			<span class="py-8" style="--index: 1;">Record</span>
			<span class="py-8" style="--index: 2;">Record</span>
		</button>
	{/if}
</div>

<style>
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

	.hover-effect:hover {
		transform: scale(1.05) rotate(2deg) perspective(100px) rotateX(2deg);
    }

    @font-face {
        font-family: 'Minecraft';
        src: url('/fonts/minecraft_font.ttf') format('truetype');
    }

	.minecraft {
		font-family: "Minecraft", sans-serif;
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
</style>
