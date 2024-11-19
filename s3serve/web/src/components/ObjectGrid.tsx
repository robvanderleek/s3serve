import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

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

    const renderObject = (key: string) => {
        return (
            <img key={key} src={`/api/v1/buckets/${bucketName}/object?key=${encodeURIComponent(key)}`} alt={key}
                 width="320"
                 height="320"/>
        );
    }

    return (
        <div>
            {objectKeys.map(k => renderObject(k))}
        </div>
    );

}