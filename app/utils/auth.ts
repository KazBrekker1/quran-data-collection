export const AuthAdditionalFields = {
    firstName: {
        type: "string",
        returned: true,
        required: true,
        input: true,
    },
    lastName: {
        type: "string",
        returned: true,
        required: true,
        input: true,
    },
    age: {
        type: "number",
        returned: true,
        required: true,
        input: true,
    },
    gender: {
        type: "string",
        returned: true,
        required: true,
        input: true,
    },
    spokenLanguage: {
        type: "string",
        returned: true,
        required: true,
        input: true,
    },
    spokenLanguageCode: {
        type: "string",
        returned: true,
        required: true,
        input: true,
    },
} as const