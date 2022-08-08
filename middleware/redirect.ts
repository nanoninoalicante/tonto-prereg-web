export default defineNuxtRouteMiddleware((to, from) => {
    console.log("to: ", to.path);
    if (to.path === "/") {
        navigateTo("/pre-registration-tonto");
    }
});
