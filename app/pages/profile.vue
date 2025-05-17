<template>
    <UCard v-if="user">
        <template #header>
            <div class="flex items-center space-x-3">
                <UAvatar v-if="user.image" :src="user.image" :alt="`${user.firstName} ${user.lastName}`" size="md" />
                <UAvatar v-else :alt="`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`" size="md" />
                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    {{ user.firstName }} {{ user.lastName }}
                </h3>
            </div>
        </template>

        <UTable :data="[
            { label: 'Email', value: user.email },
            { label: 'Age', value: user.age },
            { label: 'Gender', value: user.gender },
            { label: 'Spoken Language', value: user.spokenLanguage },
            { label: 'Account Created', value: formatDate(user.createdAt) }
        ]" :columns="[
            { accessorKey: 'label', header: 'Field' },
            { accessorKey: 'value', header: 'Value' }
        ]" />

    </UCard>
</template>

<script setup lang="ts">
const { user } = useAuth()

function formatDate(dateInput: Date | string | undefined | null): string {
    if (!dateInput) return 'N/A';
    try {
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        return date.toLocaleDateString(undefined, { // Use user's locale
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        console.error("Error formatting date:", e);
        return typeof dateInput === 'string' ? dateInput : 'Invalid Date';
    }
}

</script>
