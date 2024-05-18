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
    let webcam: Webcam;
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

        const webcamElement = document.getElementById('webcam');
        const canvasElement = document.getElementById('canvas');
        const snapSoundElement = document.getElementById('snapSound');
        webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
        webcam.start();
	});

	const startRecording = () => {
        let img = webcam.snap();
		media = [];
		mediaRecorder?.start();
	};
	const stopRecording = () => {
		mediaRecorder?.stop();
	};


</script>


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
    <VideoStream/>
    <div class="pt-12">
        {#if recording}
            <button class="btn variant-filled" on:click={stopRecording}>Stop</button>
        {:else}
            <button class="btn variant-filled" on:click={startRecording}>Record</button>
        {/if}
    </div>
    <meter id="volumeMeter" high={0.25} max={1} value={volume}></meter>

</div>

<style>
    :root {
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
            transform: translatey(calc(var(--axis-y) * -1))  translateX(-50%);
            left: 50%;
        }
    }
</style>
