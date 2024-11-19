import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
import {ArrowBackOutlined, FolderOutlined} from "@mui/icons-material";
import {Link, useParams, useSearchParams} from "react-router-dom";

export default function FolderList() {
    const [folders, setFolders] = useState<string[]>([]);
    const {bucketName} = useParams();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (bucketName) {
            const loadBuckets = async () => {
                let url = `/api/v1/buckets/${bucketName}/folders`;
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
    }, [bucketName, searchParams]);

    const renderBucketListItem = (folder: string) => {
        let to = `/bucket/${bucketName}`;
        const prefix = searchParams.get('prefix');
        if (prefix) {
            to += `?prefix=${encodeURIComponent(prefix + folder + '/')}`;
        } else {
            to += `?prefix=${encodeURIComponent(folder + '/')}`;
        }
        return (
            <ListItem key={folder} disablePadding>
                <ListItemButton component={Link} to={to}>
                    <ListItemIcon>
                        <FolderOutlined/>
                    </ListItemIcon>
                    <ListItemText>
                        {folder}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        );
    }

    const getBackLink = () => {
        let result = '/';
        const prefix = searchParams.get('prefix');
        if (prefix) {
            result += `bucket/${bucketName}`;
            const folderSeparatorIndex = prefix.lastIndexOf('/', prefix.length - 2);
            if (folderSeparatorIndex > 0) {
                result += `?prefix=${encodeURIComponent(prefix.substring(0, folderSeparatorIndex + 1))}`;
            }
        }
        return result;
    }

    const renderBackItem = () => {
        return (
            <ListItem disablePadding>
                <ListItemButton component={Link} to={getBackLink()}>
                    <ListItemIcon>
                        <ArrowBackOutlined/>
                    </ListItemIcon>
                    <ListItemText>
                        Back
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        )
    }

    const renderBucketListItems = () => {
        return folders.map((folder) => renderBucketListItem(folder));
    }

    return (
        <List>
            {renderBackItem()}
            {renderBucketListItems()}
        </List>
    );
}