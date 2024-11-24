import {ListObjectsV2ContentResponse} from "./ListObjectsV2ContentResponse.ts";

export interface ListObjectsV2Response {
    IsTruncated: boolean;
    Contents: ListObjectsV2ContentResponse[];
    NextContinuationToken: string;
}