import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Container, Divider, Grid, Tab, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// redux
import { addCart, getProduct, onGotoStep } from '../../redux/slices/product';
import { useDispatch, useSelector } from '../../redux/store';
// routes
// @types
import { CartItem } from '../../@types/product';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import Page from '../../components/Page';
import { SkeletonProduct } from '../../components/skeleton';
// sections
import GuestCartWidget from 'src/sections/guest/GuestCartWidget';
import {
  ProductDetailsCarousel,
  ProductDetailsReview,
  ProductDetailsSummary,
} from '../../sections/guest/product-details';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

export default function GuestProductDetails() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [value, setValue] = useState('1');

  const { name = '' } = useParams();

  const { product, error, checkout } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);

  const handleAddCart = (product: CartItem) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };

  const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(11),
    },
  }));

  return (
    <Page title="Ecommerce: Product Details">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          {/*  <HeaderBreadcrumbs
            heading="Product Details"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'E-Commerce',
                href: PATH_DASHBOARD.eCommerce.root,
              },
              {
                name: 'Shop',
                href: PATH_DASHBOARD.eCommerce.shop,
              },
              { name: sentenceCase(name) },
            ]}
          />
 */}
          <GuestCartWidget />

          {product && (
            <>
              <Card>
                <Grid container>
                  <Grid item xs={12} md={6} lg={7}>
                    <ProductDetailsCarousel product={product} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={5}>
                    <ProductDetailsSummary
                      product={product}
                      cart={checkout.cart}
                      onAddCart={handleAddCart}
                      onGotoStep={handleGotoStep}
                    />
                  </Grid>
                </Grid>
              </Card>

              <Grid container sx={{ my: 8 }}>
                {PRODUCT_DESCRIPTION.map((item) => (
                  <Grid item xs={12} md={4} key={item.title}>
                    <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                      <IconWrapperStyle>
                        <Iconify icon={item.icon} width={36} height={36} />
                      </IconWrapperStyle>
                      <Typography variant="subtitle1" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Card>
                <TabContext value={value}>
                  <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                    <TabList onChange={(e, value) => setValue(value)}>
                      <Tab disableRipple value="1" label="Description" />
                      <Tab
                        disableRipple
                        value="2"
                        label={`Review (${product.reviews.length})`}
                        sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                      />
                    </TabList>
                  </Box>

                  <Divider />

                  <TabPanel value="1">
                    <Box sx={{ p: 3 }}>
                      <Markdown children={product.description} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <ProductDetailsReview product={product} />
                  </TabPanel>
                </TabContext>
              </Card>
            </>
          )}

          {!product && <SkeletonProduct />}

          {error && <Typography variant="h6">404 Product not found</Typography>}
        </Container>
      </RootStyle>
    </Page>
  );
}
