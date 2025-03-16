import { betterAuth } from "better-auth";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { passkey } from "better-auth/plugins/passkey"

const dialect = new LibsqlDialect({
    url: process.env.TURSO_DATABASE_URL || "",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
})

export const auth = betterAuth({
    database: {
        dialect,
        type: "sqlite"
    },
    user: {
        additionalFields: {
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
            motherCountry: {
                type: "string",
                returned: true,
                required: true,
                input: true,
            },
            spokenDialect: {
                type: "string",
                returned: true,
                required: true,
                input: true,
            },
        }
    },
    emailAndPassword: {
        enabled: true,
        requireUniqueEmail: true,
        requireEmailVerification: false,
    },
    plugins: [
        passkey(),
        // captcha({
        //     provider: "cloudflare-turnstile",
        //     secretKey: process.env.TURNSTILE_SECRET_KEY || "",
        // })
    ]
});