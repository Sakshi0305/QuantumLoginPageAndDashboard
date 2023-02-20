export interface Course {
    image: string;
    title: string;
    subject: string;
    grade: number;
    topics: number;
    additional_grade: number;
    units: number;
    lessons: number;
    classes: string[];
    students: null | number;
    start_date: null | string;
    end_date: null | string;
    isfavourite: boolean;
    isexpired: boolean;
    footer: Footer

}

export interface Footer {
    iswatch: boolean;
    iscalender: boolean;
    isgraded: boolean;
    isreported: boolean
}