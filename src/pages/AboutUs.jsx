import React, { useEffect, useRef } from "react";
import { motion, useAnimate, useAnimation, useInView } from "framer-motion";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Reveal from "../components/Reveal";

const AboutUs = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        style={{
          backgroundImage: `url('https://www.mercedes-benz-techinnovation.com/_ipx/w_2660/home/hero_yellow.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          display: "flex",
          alignItems: "flex-end",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          padding: 24,
          marginBottom: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Typography variant="h2">Welcome to Our Car Rental</Typography>
          <Typography variant="body1">
            Discover a world of convenience with our reliable car rental
            services.
          </Typography>
        </motion.div>
      </motion.div>

      <Reveal>
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Who We Are
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            scelerisque magna sit amet odio finibus luctus. Ut gravida justo a
            magna consectetur sodales.
          </Typography>
        </Container>
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1">
            Our mission is to provide reliable and affordable car rental
            services to our customers, ensuring a seamless experience from
            booking to drop-off.
          </Typography>
        </Container>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Our Values
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Customer satisfaction" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Quality vehicles" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Transparency and honesty" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Environmental responsibility" />
            </ListItem>
          </List>
        </Container>
      </Reveal>
      <Reveal>
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Who We Are
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            scelerisque magna sit amet odio finibus luctus. Ut gravida justo a
            magna consectetur sodales.
          </Typography>
        </Container>
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1">
            Our mission is to provide reliable and affordable car rental
            services to our customers, ensuring a seamless experience from
            booking to drop-off.
          </Typography>
        </Container>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Our Values
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Customer satisfaction" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Quality vehicles" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Transparency and honesty" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Environmental responsibility" />
            </ListItem>
          </List>
        </Container>
      </Reveal>
    </div>
  );
};

export default AboutUs;
