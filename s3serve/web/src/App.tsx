import {AppBar, Box, CssBaseline, Drawer, styled, Toolbar} from "@mui/material";
import {Link, Outlet} from "react-router-dom";
import ObjectGrid from "./components/ObjectGrid.tsx";

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
    return (
        <StyledBox>
            <CssBaseline/>
            <StyledAppBar position="fixed">
                <Toolbar>
                    <Link to="/">S3 Server</Link>
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
