export interface QuoteInterface {
    content : string;
    id : number;
    originator : OriginatorInterface;
    tags : Array<string>;
}

export interface OriginatorInterface{
    id : number;
    name : string;
}
