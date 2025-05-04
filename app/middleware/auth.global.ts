export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth_required_paths = ["/"]
    const auth_optional_paths = ["/login", "/register"]

    const { loggedIn, fetchSession } = useAuth()

    await fetchSession()

    if (!loggedIn.value) {
        if (auth_required_paths.includes(to.path)) {
            return navigateTo("/login");
        }
    } else if (loggedIn) {
        if (auth_optional_paths.includes(to.path)) {
            return navigateTo("/");
        }
    }
});