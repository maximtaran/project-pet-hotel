import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Card, CardContent, CardMedia } from '@mui/material';


function Main(props) {
  const { title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >

      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Divider />
        <Card className='blog-article'>
            <div className='blog-img-wrapper'>
              <CardMedia
                className='blog-img'
                component="img"
                image="https://cdn.britannica.com/60/8160-050-08CCEABC/German-shepherd.jpg"
                alt="green iguana"
              />
            </div>
            
            <CardContent className='blog-card-content'>
              <Typography gutterBottom variant="h5" component="div">
                Dog nose
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In fact, a number of our own hero hounds were awarded PDSA medals for their noses! Arms and explosives search dog Buster (pictured above) was awarded his PDSA Dickin Medal in 2003 for his remarkable service in Iraq – he located a large amount of weapons and explosives linked to an extremist group, saving the lives of many civilians and service personnel.
              </Typography>
            </CardContent>
        </Card>


        <Card className='blog-article'>
            <div className='blog-img-wrapper'>
              <CardMedia
                className='blog-img'
                component="img"
                image="https://d.newsweek.com/en/full/1980820/curled-sleeping-cat.jpg?w=1600&h=1200&q=88&f=201b77b35d21e997305718ee339d2199"
                alt="green iguana"
              />
            </div>
            
            <CardContent className='blog-card-content'>
              <Typography gutterBottom variant="h5" component="div">
              Cats sleep for around 13 to 16 hours a day (70% of their life)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                
              </Typography>
            </CardContent>
        </Card>


        <Card className='blog-article'>
            <div className='blog-img-wrapper'>
              <CardMedia
                className='blog-img'
                component="img"
                image="https://i.pinimg.com/originals/f2/25/32/f22532c3cda374924389f38533840723.png"
                alt="green iguana"
              />
            </div>
            
            <CardContent className='blog-card-content'>
              <Typography gutterBottom variant="h5" component="div">
                Cats can jump up to 6 times their height.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cats are really good jumpers and can jump really high.
                You can often see them on the top of a garden fence or on a really high wall!
                They have very strong muscles in their legs which catapults them into the air
              </Typography>
            </CardContent>
        </Card>



    </Grid>
  );
}

export default Main;