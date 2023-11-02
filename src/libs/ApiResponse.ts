export class ApiResponse {
    public success: boolean;
    public data = null;
    public massage: string;

    constructor(data: any, message: string) {
        this.success = true;
        this.data = data;
        this.massage= message;
    }
}