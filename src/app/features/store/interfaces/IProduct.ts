export interface IProduct {
    id: number | null,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    count:number | null,
    rating: {
        rate: number,
        count: number
    }
}
