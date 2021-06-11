import React from 'react'
import { Button, Drawer, Icon } from 'rsuite'
import { useModalState, useMediaQuery } from '../../misc/custom-hook'
import Dashboard from './Index';

const DashboardToggle = () => {

    const { isOpen, open, close } = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)')

    return (
        <>
            <Button block color="blue" onClick={open}>
                <Icon icon = "dashboard"/> Dashboard
            </Button>

            <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
                <Dashboard/>
            </Drawer>
        </>
    )
}

export default DashboardToggle
