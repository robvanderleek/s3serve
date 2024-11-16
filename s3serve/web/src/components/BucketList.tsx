import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
import {CloudCircleOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";

export default function BucketList() {
    const [buckets, setbuckets] = useState<string[]>([]);

    useEffect(() => {
        const loadBuckets = async () => {
            const res = await fetch('/api/v1/buckets');
            const json = await res.json();
            setbuckets(json.buckets);
        };
        loadBuckets();
    }, []);

    const renderBucketListItem = (item: string) => {
        return (
            <ListItem key={item} disablePadding>
                <ListItemButton component={Link} to={`bucket/${item}`}>
                    <ListItemIcon>
                        <CloudCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText>
                        {item}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        );
    }

    const renderBucketListItems = () => {
        return buckets.map((item) => renderBucketListItem(item));
    }

    return (
        <List>
            {renderBucketListItems()}
        </List>
    );
}