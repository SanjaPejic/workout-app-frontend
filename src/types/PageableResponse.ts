export interface PageableResponse<T> {
        content: T[];
        totalPages: number;
        totalElements: number;
        number: number; // current page number
        size: number;
    }
