export declare const schemas: import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    postingId: string;
    requisitionId: string;
    channel: "external" | "internal" | "referral" | "agency";
    status: "published" | "draft" | "archived";
    templateId?: string | null | undefined;
    previewUrl?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    expiresAt?: NativeDate | null | undefined;
    branding?: {
        employerValueProps: string[];
        mediaAssets: string[];
        heroTitle?: string | null | undefined;
        footerText?: string | null | undefined;
    } | null | undefined;
    seo?: {
        keywords: string[];
        slug?: string | null | undefined;
        metaDescription?: string | null | undefined;
    } | null | undefined;
    orgStructureJobId?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    postingId: string;
    requisitionId: string;
    channel: "external" | "internal" | "referral" | "agency";
    status: "published" | "draft" | "archived";
    templateId?: string | null | undefined;
    previewUrl?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    expiresAt?: NativeDate | null | undefined;
    branding?: {
        employerValueProps: string[];
        mediaAssets: string[];
        heroTitle?: string | null | undefined;
        footerText?: string | null | undefined;
    } | null | undefined;
    seo?: {
        keywords: string[];
        slug?: string | null | undefined;
        metaDescription?: string | null | undefined;
    } | null | undefined;
    orgStructureJobId?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    _id: false;
}>> & import("mongoose").FlatRecord<{
    postingId: string;
    requisitionId: string;
    channel: "external" | "internal" | "referral" | "agency";
    status: "published" | "draft" | "archived";
    templateId?: string | null | undefined;
    previewUrl?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    expiresAt?: NativeDate | null | undefined;
    branding?: {
        employerValueProps: string[];
        mediaAssets: string[];
        heroTitle?: string | null | undefined;
        footerText?: string | null | undefined;
    } | null | undefined;
    seo?: {
        keywords: string[];
        slug?: string | null | undefined;
        metaDescription?: string | null | undefined;
    } | null | undefined;
    orgStructureJobId?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>[];
export declare class AppModule {
}
