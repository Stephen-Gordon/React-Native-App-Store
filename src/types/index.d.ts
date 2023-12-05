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
    genre: string;
    reviews: ReviewInterface[];
    users: string[];
    image_path: string;
    averageRating: number;
    __v: number;

}

export interface ReviewInterface {
	_id: string;
	user: string;
	app: string;
	rating: number;
	content: string;
    __v: number;
}