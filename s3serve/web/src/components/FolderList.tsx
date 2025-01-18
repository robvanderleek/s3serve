import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
import {ArrowBackOutlined, FolderOutlined} from "@mui/icons-material";
import {Link, useParams} from "react-router-dom";
import {parseBucketName, parseFolderKey} from "../utils.ts";

export default function FolderList() {
    const [folders, setFolders] = useState<string[]>([]);
    const {'*': path} = useParams();
    const bucketName = parseBucketName(path);
    const folderKey = parseFolderKey(path);

    useEffect(() => {
        if (bucketName) {
            const loadBuckets = async () => {
                let url = `/api/v1/buckets/${bucketName}/folders`;
                if (folderKey) {
                    url += `?prefix=${encodeURIComponent(folderKey + '/')}`;
                }
                const res = await fetch(url);
                const json = await res.json();
                setFolders(json.folders);
            };
            loadBuckets();
        }
    }, [bucketName, folderKey]);

    const renderBucketListItem = (folder: string) => {
        return (
            <ListItem key={folder} disablePadding>
                <ListItemButton component={Link} to={`${path}/${folder}`}>
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
        if (folderKey) {
            result += `bucket/${bucketName}`;
            const folderSeparatorIndex = folderKey.lastIndexOf('/');
            if (folderSeparatorIndex > 0) {
                result += `/${(folderKey.substring(0, folderSeparatorIndex))}`;
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