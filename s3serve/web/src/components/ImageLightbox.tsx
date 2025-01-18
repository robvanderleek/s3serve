import {Skeleton} from "@mui/material";
import {useEffect, useState} from "react";

export default function ImageLightbox(props: { bucketName: string, objectKey: string }) {
    const {bucketName, objectKey} = props;
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

    if (loading) {
        return (<Skeleton variant="rectangular"/>);
    } else {
        return (
            <div style={{
                backgroundImage: `url(${imageBlobUrl})`,
                backgroundPosition: 'center',
                backgroundRepeat: "no-repeat",
                backgroundSize: 'contain',
                width: '100%',
                height: '100%',
            }}/>
        );
    }
}