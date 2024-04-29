class ApiResponse {
    status = null;
    message = "";
    data = null;

    constructor(status, message, data = null) {
        this.status = status || true;
        this.message = message || "Response from API!!"
        this.data = data
    }
}


export default ApiResponse;