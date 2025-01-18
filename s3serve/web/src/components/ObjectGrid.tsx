import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {parseBucketName, parseFolderKey} from "../utils.ts";
import {ListObjectsV2Response} from "../entities/ListObjectsV2Response.ts";
import {ListObjectsV2ContentResponse} from "../entities/ListObjectsV2ContentResponse.ts";
import {LoaderContainer, StyledInfiniteScroll} from "./ObjectGrid.style.tsx";
import {Bars} from "react-loader-spinner";
import ImageObject from "./ImageObject.tsx";
import ImageLightbox from "./ImageLightbox.tsx";

export default function ObjectGrid() {
    const {'*': path} = useParams();
    const bucketName = parseBucketName(path);
    const folderKey = parseFolderKey(path);
    const [continuationToken, setContinuationToken] = useState<string | undefined>(undefined);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [objectKeys, setObjectKeys] = useState<ListObjectsV2ContentResponse[]>([]);
    const [selectedObjectKeyIndex, setSelectedObjectKeyIndex] = useState<number>(-1);
    const [searchParams, setSearchParams] = useSearchParams();

    const loadObjects = async (append = true) => {
        let url = `/api/v1/buckets/${bucketName}/objects`;
        const params = new URLSearchParams();
        if (folderKey) {
            params.append('prefix', folderKey + '/');
        }
        if (continuationToken) {
            params.append('token', continuationToken);
        }
        if (params.size > 0) {
            url += '?' + params.toString();
        }
        const res = await fetch(url);
        const listObjects = await res.json() as ListObjectsV2Response;
        setContinuationToken(listObjects.NextContinuationToken);
        setHasMore(listObjects.IsTruncated);
        const imageObjectKeys = listObjects.Contents.filter((obj) => isImageKey(obj.Key));
        if (append) {
            setObjectKeys(objectKeys.concat(...imageObjectKeys));
        } else {
            setObjectKeys([...imageObjectKeys]);
        }
    }

    useEffect(() => {
        setContinuationToken(undefined);
        setHasMore(true);
        setObjectKeys([]);
        setSelectedObjectKeyIndex(-1);
        loadObjects(false);
    }, [bucketName, folderKey]);

    useEffect(() => {
        if (!searchParams.has('object')) {
            setSelectedObjectKeyIndex(-1);
        }
    }, [searchParams]);

    const isImageKey = (key: string) => {
        return key.toLowerCase().endsWith('.jpg') || key.toLowerCase().endsWith('.jpeg') || key.toLowerCase().endsWith('.png');
    }

    const loader = () => {
        return (
            <LoaderContainer key="loading-indicator">
                <Bars height="50" width="60" color="#ffffff" ariaLabel="bars-loading"/>
            </LoaderContainer>
        );
    }

    const selectObject = (index: number) => {
        setSelectedObjectKeyIndex(index);
        setSearchParams({object: objectKeys[index].Key});
    }

    if (bucketName) {
        if (selectedObjectKeyIndex >= 0) {
            return (
                <div style={{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <ImageLightbox bucketName={bucketName} objectKey={objectKeys[selectedObjectKeyIndex].Key}/>
                </div>
            );
        } else {
            return (
                <StyledInfiniteScroll
                    dataLength={objectKeys.length}
                    next={loadObjects}
                    hasMore={hasMore}
                    loader={loader()}
                >
                    {objectKeys.map((ok, index) => <ImageObject key={ok.Key}
                                                                onClick={() => selectObject(index)}
                                                                bucketName={bucketName} objectKey={ok.Key}/>)}
                </StyledInfiniteScroll>
            );
        }
    }

}