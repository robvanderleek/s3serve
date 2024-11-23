import {AppBar, Box, CssBaseline, Drawer, styled, Toolbar} from "@mui/material";
import {Outlet, useParams} from "react-router-dom";
import ObjectGrid from "./components/ObjectGrid.tsx";
import BreadCrumbs from "./components/BreadCrumbs.tsx";


const StyledBox = styled(Box)`
    display: flex;
`;

const StyledAppBar = styled(AppBar)(({theme}) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

const drawerWidth = 320;

const StyledDrawer = styled(Drawer)`
    width: ${drawerWidth}px;
    flex-shrink: 0;

    & .MuiDrawer-paper {
        width: ${drawerWidth}px;
        box-sizing: border-box;
    }
`;


function App() {
    const {'*': path} = useParams();

    return (
        <StyledBox>
            <CssBaseline/>
            <StyledAppBar position="fixed">
                <Toolbar>
                    <BreadCrumbs path={path}/>
                </Toolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent">
                <Toolbar/>
                <Outlet/>
            </StyledDrawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <ObjectGrid/>
            </Box>
        </StyledBox>
    );
}

export default App
