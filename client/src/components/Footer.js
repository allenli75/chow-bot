import React from 'react';

import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';
import './Footer.css';

const Footer = () => {
    return(
        <div className="footer">
            Copyright <CopyrightRoundedIcon className="footer-icon"/> 2022 Allen Li | All rights reserved
        </div>
    );
};

export default Footer;