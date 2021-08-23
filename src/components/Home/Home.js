import React from 'react'
import { Container } from '@material-ui/core';

import mainImage from '../../images/app_main_image.jpeg'

export default function Home() {
    return (
        <div>
            <Container maxWidth="sm">

            <img src={mainImage} style={{ width: 700 }}/>
            <br />
            <br />
            <input/>
            <button> Search </button>
            <div style={{border: "1px solid black", height: 300, width: 300}}>
                
            </div>
            
            
            </Container>

        </div>
    )
}
