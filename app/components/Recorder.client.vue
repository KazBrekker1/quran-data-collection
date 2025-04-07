<template>
    <UButton v-if="!is_recording" @click="startRecording" icon="lucide:play" variant="subtle">
        Start Recording
    </UButton>
    <UButton v-else @click="stopRecording" icon="lucide:square" color="error">
        Stop Recording
    </UButton>
</template>

<script lang="ts" setup>
let is_recording = defineModel<boolean>("is_recording", { default: false });

const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
        deviceId: "default",
    },
});

let chunks = ref<any>([]);
const audioContext = new AudioContext();
const recordingSampleRate = audioContext.sampleRate;

const bufferSize = 2048;
const numberOfChannels = 1;
const expectedSampleRate = 16000;

const mediaRecorder = audioContext.createScriptProcessor(bufferSize, numberOfChannels, numberOfChannels);
let mediaStream = audioContext.createMediaStreamSource(stream);

mediaRecorder.onaudioprocess = (event: AudioProcessingEvent) => {
    let float32Array = new Float32Array(event.inputBuffer.getChannelData(0))
    let samples = downsampleBuffer(float32Array, expectedSampleRate, recordingSampleRate)

    let buf = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; ++i) {
        let s = Math.max(-1, Math.min(1, samples[i] ?? 0));
        buf[i] = s * 32767;
    }
    chunks.value.push(buf);
};

const startRecording = () => {
    mediaStream.connect(mediaRecorder);
    mediaRecorder.connect(audioContext.destination);

    is_recording.value = true;
};

const stopRecording = () => {
    mediaStream.disconnect(mediaRecorder);
    mediaRecorder.disconnect(audioContext.destination);

    let samples = flatten(chunks.value) as any;
    const blob = toWav(samples, expectedSampleRate);

    emit("done-recording", blob);
    chunks.value = [];

    is_recording.value = false;
};

const emit = defineEmits<{
    "done-recording": [Blob];
}>();
</script>