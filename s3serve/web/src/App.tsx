import {AppBar, Box, CssBaseline, Drawer, styled, Toolbar} from "@mui/material";
import BucketList from "./components/BucketList.tsx";

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
                    S3 Server
                </Toolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent">
                <Toolbar/>
                <BucketList/>
            </StyledDrawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <h1>Hello world</h1>

            </Box>
        </StyledBox>
    );
}

export default App
