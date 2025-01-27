import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {parseBucketName, parseFolderKey} from "../utils.ts";
import {ListObjectsV2Response} from "../entities/ListObjectsV2Response.ts";
import {ListObjectsV2ContentResponse} from "../entities/ListObjectsV2ContentResponse.ts";
import {LightboxContainer, LoaderContainer, StyledInfiniteScroll} from "./ObjectGrid.style.tsx";
import {Bars} from "react-loader-spinner";
import ImageThumbnailObject from "./ImageThumbnailObject.tsx";
import ImageLightbox from "./ImageLightbox.tsx";
import {Button, ButtonGroup} from "@mui/material";
import {useHotkeys} from "react-hotkeys-hook";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";

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

    useHotkeys('left', () => {
        previousObject();
    }, [objectKeys, selectedObjectKeyIndex]);

    useHotkeys('esc', () => {
        closeLightbox();
    }, []);

    useHotkeys('right', () => {
        nextObject();
    }, [objectKeys, selectedObjectKeyIndex]);

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

    const previousObject = () => {
        selectObject(Math.max(0, selectedObjectKeyIndex - 1));
    }

    const nextObject = () => {
        selectObject(Math.min(objectKeys.length - 1, selectedObjectKeyIndex + 1));
    }

    const closeLightbox = () => setSelectedObjectKeyIndex(-1);

    if (bucketName) {
        if (selectedObjectKeyIndex >= 0) {
            return (
                <LightboxContainer>
                    <ImageLightbox bucketName={bucketName} objectKey={objectKeys[selectedObjectKeyIndex].Key}/>
                    <ButtonGroup variant="contained" style={{marginTop: '1em'}}>
                        <Button onClick={previousObject} disabled={selectedObjectKeyIndex <= 0}
                                startIcon={<KeyboardArrowLeft/>}>Previous</Button>
                        <Button onClick={nextObject}
                                disabled={selectedObjectKeyIndex >= objectKeys.length - 1}
                                endIcon={<KeyboardArrowRight/>}>Next</Button>
                        <Button onClick={closeLightbox}>Close</Button>
                    </ButtonGroup>
                </LightboxContainer>
            );
        } else {
            return (
                <StyledInfiniteScroll
                    dataLength={objectKeys.length}
                    next={loadObjects}
                    hasMore={hasMore}
                    loader={loader()}
                >
                    {objectKeys.map((ok, index) => <ImageThumbnailObject key={ok.Key}
                                                                         onClick={() => selectObject(index)}
                                                                         bucketName={bucketName} objectKey={ok.Key}/>)}
                </StyledInfiniteScroll>
            );
        }
    }

}