export class HTTPHelpers {

    constructor() { }


    public static createFormDataFromObject<T>(body: T): FormData {
        const formData = new FormData();
        if (typeof body !== 'object') {
            return formData;
        }
        for (const key in body) {
            if (body[key] instanceof File) {
                formData.append(key, body[key] as File, (body[key] as File).name);
            } else {
                formData.append(key, String(body[key]));
            }
        }
        return formData;
    }
}
