import { LibsqlDialect } from "@libsql/kysely-libsql";
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { AuthAdditionalFields } from "../../app/utils/auth";

const tursoDialect = new LibsqlDialect({
    url: process.env.TURSO_DATABASE_URL || "",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
})

export const auth = betterAuth({
    session: {
        cookieCache: {
            maxAge: 60 * 60 * 24 * 3,
        }
    },
    database: {
        dialect: tursoDialect,
        type: "sqlite" as const,
    },
    user: {
        additionalFields: AuthAdditionalFields
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    plugins: [
        passkey(),
    ],
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/get-session") {
                if (!ctx.context.session) {
                    return ctx.json({
                        session: null,
                        user: null,
                    });
                }
                return ctx.json(ctx.context.session);
            }
        }),
    },
});