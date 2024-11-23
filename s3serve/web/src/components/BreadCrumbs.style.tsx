import {styled} from "@mui/material";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {FolderOutlined, Inventory2Outlined} from "@mui/icons-material";

export const BreadCrumbLink = styled(Link)`
    display: flex;
    align-items: center;
`;

export const BreadCrumbHomeIcon = styled(HomeIcon)`
    margin-right: 0.5em;
    font-size: inherit;
`;

export const BreadCrumbFolderIcon = styled(FolderOutlined)`
    margin-right: 0.5em;
    font-size: inherit;
`;

export const BreadCrumbBucketIcon = styled(Inventory2Outlined)`
    margin-right: 0.5em;
    font-size: inherit;
`;