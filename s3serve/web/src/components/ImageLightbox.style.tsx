import {styled} from "@mui/material";

export const LoaderContainer = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface ImageContainerProps {
    imageBlobUrl: string;
}

export const ImageContainer = styled('div')<ImageContainerProps>`
    background-image: url(${props => props.imageBlobUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
`;