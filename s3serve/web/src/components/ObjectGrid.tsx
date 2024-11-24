import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ImageObject from "./ImageObject.tsx";
import {parseBucketName, parseObjectKey} from "../utils.ts";
import InfiniteScroll from "react-infinite-scroller";
import {Bars} from "react-loader-spinner";
import {ListObjectsV2Response} from "../entities/ListObjectsV2Response.ts";
import {ListObjectsV2ContentResponse} from "../entities/ListObjectsV2ContentResponse.ts";

export default function ObjectGrid() {
    const {'*': path} = useParams();
    const bucketName = parseBucketName(path);
    const objectKey = parseObjectKey(path);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [objectKeys, setObjectKeys] = useState<ListObjectsV2ContentResponse[]>([]);

    useEffect(() => {
        if (bucketName) {
            const loadBuckets = async () => {
                let url = `/api/v1/buckets/${bucketName}/objects`;
                if (objectKey) {
                    url += `?prefix=${objectKey}/`;
                }
                const res = await fetch(url);
                const listObjects = await res.json() as ListObjectsV2Response;
                setHasMore(listObjects.IsTruncated);
                setObjectKeys(listObjects.Contents.filter((obj) => isImageKey(obj.Key)));
            };
            loadBuckets();
        }
    }, [bucketName, objectKey]);

    const isImageKey = (key: string) => {
        return key.toLowerCase().endsWith('.jpg') || key.toLowerCase().endsWith('.jpeg') || key.toLowerCase().endsWith('.png');
    }

    if (bucketName) {
        return (<InfiniteScroll loadMore={() => {
        }} hasMore={hasMore}
                                loader={<div key="loading-indicator"><Bars height="50" width="60" color="#e6772b"
                                                                           ariaLabel="bars-loading"/></div>} style={{
            display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'
        }}>
            {objectKeys.map(ok => <ImageObject key={ok.Key} bucketName={bucketName} objectKey={ok.Key}/>)}
        </InfiniteScroll>);
    }

}