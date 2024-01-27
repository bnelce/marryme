import { useEffect } from 'react';
// @mui
import { Box, Container, Grid, Step, StepConnector, StepLabel, Stepper } from '@mui/material';
import { styled } from '@mui/material/styles';
// redux
import { createBilling, getCart } from '../../redux/slices/product';
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_GUEST } from '../../routes/paths';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
// sections
import {
  CheckoutBillingAddress,
  CheckoutCart,
  CheckoutOrderComplete,
  CheckoutPayment,
} from '../../sections/guest/checkout';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function QontoStepIcon({ active, completed }: { active: boolean; completed: boolean }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify
          icon={'eva:checkmark-fill'}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}

export default function GuestCheckout() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const isMountedRef = useIsMountedRef();

  const { checkout } = useSelector((state) => state.product);

  const { cart, billing, activeStep } = checkout;

  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(11),
    },
  }));

  return (
    <Page title="Ecommerce: Checkout">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Checkout"
            links={[
              { name: 'Home', href: PATH_GUEST.root },
              {
                name: 'Lista de Presentes',
                href: PATH_GUEST.general.shop,
              },
              { name: 'Pagamentos' },
            ]}
          />

          <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
            <Grid item xs={12} md={8} sx={{ mb: 5 }}>
              <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={QontoStepIcon}
                      sx={{
                        '& .MuiStepLabel-label': {
                          typography: 'subtitle2',
                          color: 'text.disabled',
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          </Grid>

          {!isComplete ? (
            <>
              {activeStep === 0 && <CheckoutCart />}
              {activeStep === 1 && <CheckoutBillingAddress />}
              {activeStep === 2 && billing && <CheckoutPayment />}
            </>
          ) : (
            <CheckoutOrderComplete open={isComplete} />
          )}
        </Container>
      </RootStyle>
    </Page>
  );
}
