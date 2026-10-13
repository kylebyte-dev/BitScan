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

export type User = {
    id: number;
    email: string;
    daily_calories: number;
    daily_protein: number;
    daily_fat: number;
    daily_carbs: number;
    created_at: Date;
}

export type NewUser = {
    email: string;
    password_hash: string;
}

export type StagedUser = {
    email: string;
    password: string;
}