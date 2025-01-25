import {useEffect, useState} from "react";
import {Bars} from "react-loader-spinner";
import {ImageContainer, LoaderContainer} from "./ImageLightbox.style.tsx";

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
        setLoading(true);
        loadImage();
    }, [bucketName, objectKey]);

    if (loading) {
        return (
            <LoaderContainer>
                <Bars height="50" width="60" color="#ffffff" ariaLabel="bars-loading"/>
            </LoaderContainer>);
    } else {
        return (
            <ImageContainer imageBlobUrl={imageBlobUrl}/>
        );
    }
}