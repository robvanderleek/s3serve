import {styled} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export const LoaderContainer = styled('div')`
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledInfiniteScroll = styled(InfiniteScroll)`
    display: flex;
    flex-wrap: wrap;
`;

export const LightboxContainer = styled('div')`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
`;