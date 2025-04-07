<template>
    <section class="flex flex-col w-full gap-4">
        <div dir="rtl" class="text-4xl">
            <span class="text-gray-400">النص: </span>
            <span>{{ prompt.before }}</span>
            <span class="text-red-500">{{ prompt.target_letter }}</span>
            <span>{{ prompt.after }}</span>
        </div>
        <h1 class="text-lg" dir="rtl">
            <span class="text-gray-400">التعليمات: </span>
            {{ prompt.instruction }}
        </h1>

        <UButton @click="skip_prompt" label="Skip" color="secondary" icon="lucide:rotate-cw" variant="ghost"
            class="ml-auto" />

        <Recorder v-model="is_recording" @done-recording="handleDoneRecording" />

        <USeparator label="Recordings" />

        <div v-for="(recording, index) in previous_recordings" :key="recording.id"
            class="flex justify-between w-full max-w-4xl gap-3 p-5 mx-auto shadow-md bg-gray-50 outline outline-gray-200 dark:outline-gray-700 dark:bg-gray-800">
            <audio :src="recording.audio_url" controls class="w-full" />
            <div class="flex gap-1">
                <UButton size="xs" @click="delete_recording(recording.id)" label="Delete" color="error" variant="subtle"
                    icon="lucide:trash" />
                <UButton size="xs" @click="submit_recording(recording.id, recording.blob)" label="Submit"
                    color="primary" icon="lucide:check" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    prompt: Prompt
}>()

const emit = defineEmits<{
    "handle-done-recording": [string, Blob];
    "skip-prompt": [];
}>();

const is_recording = ref(false)
const previous_recordings = ref<{ id: string, blob: Blob, prompt: Prompt, audio_url: string }[]>([])

const handleDoneRecording = (blob: Blob) => {
    let audio_url = URL.createObjectURL(blob)
    previous_recordings.value.push({ id: props.prompt.id, blob, prompt: props.prompt, audio_url })
}

const delete_recording = (id: string) => {
    const flag = confirm("Are you sure you want to delete this recording?")
    if (flag) {
        previous_recordings.value = previous_recordings.value.filter((recording) => recording.id !== id)
    }
}

const submit_recording = (id: string, blob: Blob) => {
    emit("handle-done-recording", id, blob)
}

const skip_prompt = () => {
    emit("skip-prompt")
}

</script>