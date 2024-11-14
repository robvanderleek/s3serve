import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
import {CloudCircleOutlined} from "@mui/icons-material";

export default function BucketList() {
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        const loadBuckets = async () => {
            const res = await fetch('/api/v1/buckets');
            const {buckets} = await res.json();
            setItems(buckets);
        };
        loadBuckets();
    }, []);

    const renderBucketListItem = (item: string) => {
        return (
            <ListItem key={item} disablePadding>
                <ListItemButton>
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
        return items.map((item) => renderBucketListItem(item));
    }

    return (
        <List>
            {renderBucketListItems()}
        </List>
    );
}