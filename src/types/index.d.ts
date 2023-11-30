export interface User {
    _id: string;
    full_name: string;
    email: string;
}

export interface AppInterface {
    _id: string;
    name: string;
    description: string;
    size_bytes: number;
    price: string
    ver:   string;
    category: string;
    reviews: number;
    users: string[];
    image_path: string;
    averageRating: number;
    __v: number;

}