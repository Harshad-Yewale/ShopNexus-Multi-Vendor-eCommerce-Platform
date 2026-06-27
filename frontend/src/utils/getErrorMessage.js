const getErrorMessage = (error, defaultMessage = "Something went wrong.") => {
    if (!error.response) {
        return "Unable to connect to the server. Please try again later.";
    }

    switch (error.response.status) {
        case 400:
            return error.response.data?.message || "Invalid request.";

        case 401:
            return error.response.data?.message ||"You are not authorized.";

        case 403:
            return error.response.data?.message ||"Access denied.";

        case 404:
            return error.response.data?.message || "Resource not found.";

        case 500:
            return "The server encountered an error. Please try again later.";

        default:
            return (
                error.response.data?.message ||
                error.response.data?.error ||
                defaultMessage
            );
    }
};

export default getErrorMessage;