export interface Restourant {
    companyId: number;
    name: string;
    menus?: MenuDish[][];
    image?: string;
}


export interface MenuDish{
    day: number;
    companyId: number;
    name: string;
    dishID: number;
    inCart?: boolean;
}
