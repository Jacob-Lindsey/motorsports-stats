import { useEffect, useState } from "react";
import { IconButton, styled } from "@mui/material";
import { Box, Button, Card as CardElement, CardActions, CardContent, CardHeader, CardMedia, Collapse, Typography } from "@mui/material";
import { ExpandMore as ExpandMoreIcon, MoreVert } from "@mui/icons-material";
import fallbackImage from "../../../public/fallback-image.png";
import styles from "./Card.module.css";

const Card = (driver) => {

    const { code, dateOfBirth, driverId, familyName, givenName, nationality, permanentNumber, url } = driver.driver;
    const splitIndex = url.lastIndexOf('/');
    const driverImageString = url.slice(splitIndex + 1);

    const [driverImage, setDriverImage] = useState();
    const [expanded, setExpanded] = useState(false);

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&origin=*&titles=${driverImageString}&pithumbsize=500&format=json`)
               .then(response => response.json())
               .then(
                   data => {
                       const dataKey = Object.keys(data.query.pages);
                       const imageUrl = data.query.pages[dataKey].thumbnail.source;
                       setDriverImage(imageUrl);
                   }
               )
               .catch((err) => console.log(err));
    }, []);

    return (
        <div className={styles.container}>
            <Box
                sx={{
                    backgroundColor: 'hsl(260, 4%, 21%)',
                    borderRadius: '0.3rem',
                    maxWidth: '400px',
                    padding: '0.4rem'
                }}
            >
                <CardElement sx={{ maxWidth: 400 }}>
                    <CardHeader 
                        title={`${givenName} ${familyName}`}
                    />
                    <CardMedia 
                        component="img"
                        alt={`${givenName} ${familyName} headshot`}
                        image={driverImage ? driverImage : fallbackImage}
                        height={400}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {givenName} {familyName}
                        </Typography>
                        <Typography variant="h6">
                            {code} {dateOfBirth}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Driver info goes here.</Typography>
                            <Typography paragraph>
                                Contrary to popular belief, Lorem Ipsum is not simply
                                random text. It has roots in a piece of classical Latin
                                literature from 45 BC, making it over 2000 years old.
                                Richard McClintock, a Latin professor at Hampden-Sydney 
                                College in Virginia, looked up one of the more obscure 
                                Latin words, consectetur, from a Lorem Ipsum passage, 
                                and going through the cites of the word in classical 
                                literature, discovered the undoubtable source. 
                                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 
                                of "de Finibus Bonorum et Malorum" (The Extremes of 
                                Good and Evil) by Cicero, written in 45 BC. This book 
                                is a treatise on the theory of ethics, very popular 
                                during the Renaissance. The first line of Lorem Ipsum, 
                                "Lorem ipsum dolor sit amet..", comes from a line in 
                                section 1.10.32.

                                The standard chunk of Lorem Ipsum used since the 1500s 
                                is reproduced below for those interested. Sections 1.10.32 
                                and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero 
                                are also reproduced in their exact original form, accompanied 
                                by English versions from the 1914 translation by H. Rackham.
                            </Typography>
                        </CardContent>
                    </Collapse>
                </CardElement>
            </Box>
        </div>
    )

};

export default Card;