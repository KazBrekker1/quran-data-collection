import { authClient } from "~/lib/auth-client";


export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth_required_paths = ["/"]
    const auth_optional_paths = ["/login", "/register"]

    const { data: session } = await authClient.useSession(useFetch);

    if (!session.value) {
        if (auth_required_paths.includes(to.path)) {
            return navigateTo("/login");
        }
    } else if (session.value) {
        if (auth_optional_paths.includes(to.path)) {
            return navigateTo("/");
        }
    }
});