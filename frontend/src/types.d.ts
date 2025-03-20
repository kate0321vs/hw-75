export interface Message {
    password: string;
    message: string;
}

export interface FormMessage {
    password: string;
    encodedMessage: string;
    decodedMessage: string;
}

export interface EncodedMessage {
    encoded: string;
}

export interface DecodedMessage {
    decoded: string;
}