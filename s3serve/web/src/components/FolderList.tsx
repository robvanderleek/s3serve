import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
import {FolderOutlined} from "@mui/icons-material";
import {Link, useParams, useSearchParams} from "react-router-dom";

export default function FolderList() {
    const [folders, setFolders] = useState<string[]>([]);
    const {name} = useParams();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (name) {
            const loadBuckets = async () => {
                let url = `/api/v1/buckets/${name}/folders`;
                const prefix = searchParams.get('prefix');
                if (prefix) {
                    url += `?prefix=${prefix}`;
                }
                const res = await fetch(url);
                const json = await res.json();
                setFolders(json.folders);
            };
            loadBuckets();
        }
    }, [name, searchParams]);

    const renderBucketListItem = (item: string) => {
        return (
            <ListItem key={item} disablePadding>
                <ListItemButton component={Link} to={`/bucket/${name}?prefix=${encodeURIComponent(item)}`}>
                    <ListItemIcon>
                        <FolderOutlined/>
                    </ListItemIcon>
                    <ListItemText>
                        {item}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        );
    }

    const renderBucketListItems = () => {
        return folders.map((item) => renderBucketListItem(item));
    }

    return (
        <List>
            {renderBucketListItems()}
        </List>
    );
}