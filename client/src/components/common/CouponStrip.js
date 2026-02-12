import React from 'react';
import { Box } from '@mui/material';
import pharmacyImg from '../../assets/pharamacy.avif';
import petImg from '../../assets/pet.avif';
import babyImg from '../../assets/daiper.avif';


const CouponStrip = () => {
    return (
        <Box sx={{
            my: 4,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2
        }}>


            <Box
                sx={{
                    flex: 1,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03)' }
                }}
            >
                <Box
                    component="img"
                    src={pharmacyImg}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                        display: 'block'
                    }}
                />
            </Box>

            <Box
                sx={{
                    flex: 1,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03)' }
                }}
            >
                <Box
                    component="img"
                    src={petImg}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                        display: 'block'
                    }}
                />
            </Box>


            <Box
                sx={{
                    flex: 1,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03)' }
                }}
            >
                <Box
                    component="img"
                    src={babyImg}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                        display: 'block'
                    }}
                />
            </Box>

        </Box>
    );
};

export default CouponStrip;