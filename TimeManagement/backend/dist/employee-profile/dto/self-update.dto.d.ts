declare class AddressDto {
    street?: string;
    city?: string;
    country?: string;
}
export declare class SelfUpdateDto {
    phone?: string;
    personalEmail?: string;
    workEmail?: string;
    biography?: string;
    address?: AddressDto;
}
export {};
