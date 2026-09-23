export interface SignedLinkOptions { expiresIn?: number; now?: number; }
export declare function createSignedLink(input: string | URL, secret: string, options?: SignedLinkOptions): string;
export declare function verifySignedLink(input: string | URL, secret: string, options?: Pick<SignedLinkOptions, "now">): boolean;
