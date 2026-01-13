import { authClient } from "./authClient";
async function signup() {
    const { data, error } = await authClient.signUp.email({
        email : "abc@gmail.com", // user email address
        password: "123456", // user password -> min 8 characters by default
        name: "Karmanay", // user display name
        image: "asdasddasd", // User image URL (optional)
        callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    });
}