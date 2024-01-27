import { m } from 'framer-motion';
// @mui
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { Link as RouterLink } from 'react-router-dom';
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';
// @mui
// routes
import { PATH_GUEST } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(/assets/overlay.svg), url(https://minimal-assets-api-dev.vercel.app/assets/images/about/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function GuestHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="Convite" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
            <TextAnimate text="e&nbsp;Acesso" sx={{ mr: 2 }} />
            <TextAnimate text=" à&nbsp;Lista" />
          </Box>

          <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium',
              }}
            >
              Você foi convidado para contribuir com a lista de presentes do casal. <br />
              Clique no botão abaixo para acessar a lista exclusiva.
            </Typography>
          </m.div>
          <m.div variants={varFade().inRight}>
            <Button
              size="large"
              variant="contained"
              component={RouterLink}
              to={PATH_GUEST.general.shop}
              startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} />}
            >
              Comece Agora!
            </Button>
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
