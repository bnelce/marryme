// @mui
import { styled } from '@mui/material/styles';
// components
// sections
import Page from 'src/components/Page';
import GuestHero from 'src/sections/guest/GuestHero';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function GuestInvitationPage() {
  return (
    <Page title="Convite">
      <RootStyle>
        <GuestHero />
        {/*<GuestWhat />
        <AboutVision />
        <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />
        <AboutTeam />
        <AboutTestimonials /> */}
      </RootStyle>
    </Page>
  );
}
