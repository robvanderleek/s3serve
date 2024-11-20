import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ImageObject from "./ImageObject.tsx";

export default function ObjectGrid() {
    const {bucketName} = useParams();
    const [searchParams] = useSearchParams();
    const [objectKeys, setObjectKeys] = useState<string[]>([]);

    useEffect(() => {
        if (bucketName) {
            const loadBuckets = async () => {
                let url = `/api/v1/buckets/${bucketName}/objects`;
                const prefix = searchParams.get('prefix');
                if (prefix) {
                    url += `?prefix=${prefix}`;
                }
                const res = await fetch(url);
                const json = await res.json();
                setObjectKeys(json.objects.filter((o: string) => isImageKey(o)));
            };
            loadBuckets();
        }
    }, [bucketName, searchParams]);

    const isImageKey = (key: string) => {
        return key.toLowerCase().endsWith('.jpg') || key.toLowerCase().endsWith('.jpeg') || key.toLowerCase().endsWith('.png');
    }

    if (bucketName) {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {objectKeys.map(k => <ImageObject key={k} bucketName={bucketName} objectKey={k}/>)}
            </div>
        );
    }

}