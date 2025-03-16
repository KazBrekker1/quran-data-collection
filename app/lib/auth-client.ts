import { auth } from "~~/server/utils/auth";
import { createAuthClient } from "better-auth/vue"
import { passkeyClient } from "better-auth/client/plugins"
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000", // the base url of your auth server
    plugins: [
        passkeyClient(),
        inferAdditionalFields<typeof auth>()
    ]
})