interface IProduct {
    id:number;
    name: string;
    price: number;
    description: string;
    categoryId?: number;
    image: string;
    stock:number;
    quantity?: number;
}

export default IProduct;
