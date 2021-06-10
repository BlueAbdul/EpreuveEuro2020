import { Type_car } from "./type_car";

export class Client {
    id: string;
    name: string;
    firstname: string;
    sexe: number;
    birthday: Date;
    email: string;
    phone: string;
    address: {
        street: string;
        zipcode: string;
        city: string;
        country: string;
    }
    car: {
        driving_licence: boolean;
        personal_car: boolean;
        car_is_vw: boolean;
        no_vw: string;
        type_car: Type_car;
    }

    know_vw: boolean;
    note_vw: number;
    accept_offers: boolean;
    rgpd: boolean;
}