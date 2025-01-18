import {AppBar, Box, Drawer, styled, Toolbar} from "@mui/material";
import {Outlet, useParams} from "react-router-dom";
import ObjectGrid from "./components/ObjectGrid.tsx";
import BreadCrumbs from "./components/BreadCrumbs.tsx";


const StyledBox = styled(Box)`
    display: flex;
    height: 100%;
    width: 100%;
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
        background: #222222;
    }
`;


function App() {
    const {'*': path} = useParams();

    return (
        <StyledBox>
            <StyledAppBar position="fixed">
                <Toolbar>
                    <BreadCrumbs path={path}/>
                </Toolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent">
                <Toolbar/>
                <Outlet/>
            </StyledDrawer>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                background: '#121212'
            }}>
                <Toolbar/>
                <ObjectGrid/>
            </div>
        </StyledBox>
    );
}

export default App
