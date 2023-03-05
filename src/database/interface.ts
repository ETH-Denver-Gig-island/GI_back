export type TR<T> = [T | null, Error | null];
export type TPR<T> = Promise<TR<T>>;

// DTO
export interface IDao {
    id: number;
    address: string;
    nickname: string;
    wallet_type: number;
}

export interface IDaoWork {
    id: number;
    address: string;
    dao_id: number;
    pay_amount: number;
    pay_date: string;
    user_role: string;
}

export interface IDaoWorkResponse {
    address: string;
    dao_id: number;
    pay_amount: number;
    pay_date: string;
    user_role: string;
}

export interface IUser {
    id: number,
    address: string,
}

export interface ILoan {
    id: number,
    user_id: number,
    dao_id: number,
    loan_status: number,
    amount: number,
    token: string,
}

export interface INFT {
    id: number,
    user_id: number,
    image: string,
    meta_url: string,
    mint_id: number,
}