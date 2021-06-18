import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Col, Grid, Row } from 'rsuite'
import Sidebar from '../../components/Sidebar'
import { RoomProvider } from '../../context/room.context'
import { useMediaQuery } from '../../misc/custom-hook'
import Chat from './Chat'



const Home = () => {

    const isDesktop = useMediaQuery('(min-width: 992px)')

    const { isExact } = useRouteMatch() // isExact is a property of useRouteMatch
    // it will give true when we are on home page

    const canRenderSidebar = isDesktop || isExact

    return (
        <RoomProvider>
            <Grid fluid className="h-100">
                <Row className="h-100">
                    {canRenderSidebar &&
                    <Col xs={24} md={8} className="h-100">
                        <Sidebar/>
                    </Col>
                    }
                    <Switch>
                        <Route exact path="/chat/:chatId">
                            <Col xs={24} md={16} className="h-100">
                            <Chat/>
                            </Col>
                        </Route>
                        <Route>
                            {isDesktop && <Col xs={24} md={16} className="h-100">
                            <h6 className="text-center mt-page">Please select chat</h6>
                            </Col>}
                        </Route>
                    </Switch>
                </Row>
           </Grid>
        </RoomProvider>
        
    )
}

export default Home
