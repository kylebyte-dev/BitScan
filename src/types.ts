export type NewProduct = {
    barcode: string;
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
};

export type Product = NewProduct & {
    id: number;
    created_at: Date;
};