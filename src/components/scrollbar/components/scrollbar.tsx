
// material
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import SimpleBarStyle from './overrides/barStyle'
// ----------------------------------------------------------------------

const RootStyle = styled('div')({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden'
});




export default function Scrollbar({ ...props }) {
    const { children, sx, ...other } = props
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        return (
            <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
                {children}
            </Box>
        );
    }

    return (
        <RootStyle>
            <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
                {children}
            </SimpleBarStyle>
        </RootStyle>
    );
}
