import { Outlet } from 'react-router-dom';
// @mui
import { Box, Container, Link, Stack, Typography } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import GuestHeader from './GuestHeader';
import MainFooter from './MainFooter';

// ----------------------------------------------------------------------

export default function GuestLayout() {
  // const { pathname } = useLocation();

  // const isHome = pathname === '/';
  const isHome = true;

  return (
    <Stack sx={{ minHeight: 1 }}>
      <GuestHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            <Logo sx={{ mb: 1, mx: 'auto' }} />

            <Typography variant="caption" component="p">
              © Todos os direitos reservados
              <br /> desenvolvido por &nbsp;
              <Link href="https://minimals.cc/">Marry Me</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
