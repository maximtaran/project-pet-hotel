import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Link } from 'react-router-dom';



const mainFeaturedPost = {
  image: 'https://d10tatjf967fp1.cloudfront.net/image/upload/f_auto/v1/user/cUTNkblIxcENWRzVNUkdzOQ%3D%3D/forum/xw7s56uwbn31bko1hkjr.png',
  
};

const sidebar = {
  title: 'About',
  description:
    'With the help of this site you can find a person who will take care of your animal for a while',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container  maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />

          <Link
            to='/pet-board'
            className='btn-link'
            
          >
            Link to stay with pet
          </Link>
            
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Interesting articles" />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        className='footer'
        title="Pet-hotel"
        description="Help to stay with our lovely animals"
      />
    </ThemeProvider>
  );
}