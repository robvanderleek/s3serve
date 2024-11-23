import {Breadcrumbs as MUIBreadCrumbs} from "@mui/material";
import React from "react";
import {BreadCrumbBucketIcon, BreadCrumbFolderIcon, BreadCrumbHomeIcon, BreadCrumbLink} from "./BreadCrumbs.style.tsx";

export default function BreadCrumbs(props: { path: string | undefined }) {
    const renderBucketBreadcrumb = (bucket: string) => {
        return (
            <BreadCrumbLink key={bucket} to={`bucket/${bucket}`}>
                <BreadCrumbBucketIcon/>
                {bucket}
            </BreadCrumbLink>
        );
    }

    const renderFolderBreadcrumbs = (bucket: string, folder: string, folderPath: string) => {
        return (
            <BreadCrumbLink key={folderPath} to={`bucket/${bucket}/${folderPath}`}>
                <BreadCrumbFolderIcon/>
                {folder}
            </BreadCrumbLink>
        );
    }

    const renderPathBreadCrumbs = (path: string): Array<React.JSX.Element> => {
        const result: Array<React.JSX.Element> = [];
        const parts = path.split('/');
        const bucket = parts[0];
        result.push(renderBucketBreadcrumb(bucket));
        parts.slice(1).forEach((p, i) => {
            const to = parts.slice(1, i + 2).join('/');
            result.push(renderFolderBreadcrumbs(bucket, p, to));
        });
        return result;
    }

    return (
        <MUIBreadCrumbs>
            <BreadCrumbLink to="/">
                <BreadCrumbHomeIcon/>
                S3 Server
            </BreadCrumbLink>
            {props.path && renderPathBreadCrumbs(props.path)}
        </MUIBreadCrumbs>
    )

}