export interface simplifiedProduct {
    _id: string;
    imageUrl: string;
    price: number;
    slug: string;
    categoryName: string;
    name: string;
}

export interface fullProduct {
    price_id: string;
    _id: string;
    images: any;
    price: number;
    slug: string;
    categoryName: string;
    name: string;
    description: string;
}