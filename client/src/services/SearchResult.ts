export interface ResponseErr {
    code: number,
    err: string,
    data: null
}

export interface ResponseData<T> {
    data: T,
    code: number,
    err: ''
}

export interface ResponsePageData<T> {
    data: T[],
    code: number,
    total: number
}