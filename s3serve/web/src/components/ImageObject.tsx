import {Image, ImageObjectContainer} from "./ImageObject.style.tsx";
import {Skeleton, Tooltip} from "@mui/material";
import {useEffect, useState} from "react";

interface ImageObjectProps {
    bucketName: string;
    objectKey: string;
    onClick?: () => void;
}

export default function ImageObject(props: ImageObjectProps) {
    const {bucketName, objectKey, onClick} = props;
    const [loading, setLoading] = useState(true);
    const [imageBlobUrl, setImageBlobUrl] = useState('');

    useEffect(() => {
        const loadImage = async () => {
            const url = `/api/v1/buckets/${bucketName}/object?key=${encodeURIComponent(objectKey)}`;
            const res = await fetch(url);
            const blob = await res.blob();
            setImageBlobUrl(URL.createObjectURL(blob));
            setLoading(false);
        };
        loadImage();
    }, []);


    return (
        <ImageObjectContainer onClick={onClick}>
            {loading && <Skeleton variant="rectangular" width={180} height={180}/>}

            {!loading &&
                <Tooltip title={objectKey}>
                    <Image src={imageBlobUrl} alt={objectKey}/>
                </Tooltip>
            }
        </ImageObjectContainer>
    );
}