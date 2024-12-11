"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css"; // Base styles
import "swiper/css/autoplay"; // For Autoplay module

import { Box, Typography } from "@mui/material";

const logos = [
  "https://leadersbuilding1.netlify.app/img/logo%20png/logo-inna.png",
  "https://leadersbuilding1.netlify.app/img/logo%20png/logo-le-coin-immo.png",
  "https://leadersbuilding1.netlify.app/img/logo%20png/logo-leaders-groupe-png.png",
  "https://leadersbuilding1.netlify.app/img/logo%20png/logo-negoce.png",
  "https://leadersbuilding1.netlify.app/img/logo%20png/logo-portail.png",
  "https://leadersbuilding1.netlify.app/img/logo%20png/leaders-immo.png",
  "https://leadersbuilding1.netlify.app/img/logo%20png/logo-digital.png",
  "https://leadersbuilding1.netlify.app/img/logo%20png/Makeup-Logo.png"
];

const PartnerSlider = () => {
  return (
    < div className="container">


      <Box sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <div className="row">
            <div className="col-12">
              <div className="wpo-section-title">
                <span>Nos Partenaires</span>
                <h2>Découvrez nos partenaires</h2>
              </div>
            </div>
          </div>

        </Box>
        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  style={{
                    height: "64px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </div>
  );
};

export default PartnerSlider;
