import React from 'react';
import { Box } from '@mui/material';

const CouponStrip = () => {
    return (
        <Box sx={{ 
            my: 4, 
            display: 'flex',            // <--- Forces items to be in a ROW
            justifyContent: 'space-between', // Spreads them out evenly
            gap: 2                      // Adds space between the images
        }}>
             
            {/* Card 1: Pharmacy */}
            <Box 
                sx={{ 
                    flex: 1, // <--- Makes it take equal width (1/3rd)
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03)' }
                }}
            >
                <Box 
                    component="img"
                    src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg" 
                    sx={{ 
                        width: '100%', 
                        height: 'auto',
                        borderRadius: '12px',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                        display: 'block'
                    }}
                />
            </Box>

            {/* Card 2: Pet Care */}
            <Box 
                sx={{ 
                    flex: 1, // <--- Makes it take equal width (1/3rd)
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03)' }
                }}
            >
                 <Box 
                    component="img"
                    src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/pet_crystal_WEB-1.png" 
                    sx={{ 
                        width: '100%', 
                        height: 'auto',
                        borderRadius: '12px',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                        display: 'block'
                    }}
                />
            </Box>

            {/* Card 3: Baby Care */}
            <Box 
                sx={{ 
                    flex: 1, // <--- Makes it take equal width (1/3rd)
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03)' }
                }}
            >
                 <Box 
                    component="img"
                    src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/baby_crystal_WEB-1.png" 
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