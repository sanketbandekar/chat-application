import React from 'react'
import { Col, Grid, Row } from 'rsuite'
import Sidebar from '../components/Sidebar'
import { RoomProvider } from '../context/room.context'



const Home = () => {
    return (
        <RoomProvider>
            <Grid fluid className="h-100">
                <Row className="h-100">
                    <Col xs={24} md={8} className="h-100">
                        <Sidebar/>
                    </Col>
                </Row>
           </Grid>
        </RoomProvider>
        
    )
}

export default Home
