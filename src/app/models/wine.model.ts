export interface Wine {
    id: number;
    name: string;
    imgs:string;
    winery: string;
    description: string;
    type: string;
    year: string;
    alcohol: string;
    color: string;
    sku: string;
    price: number;
    discount: number;
    quantity: number;
    shop: boolean;
    landing: boolean;
    createTime: Date;
    updateTime: Date;
}