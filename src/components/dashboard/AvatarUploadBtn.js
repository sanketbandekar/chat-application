/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor'
import { useModalState } from '../../misc/custom-hook';

const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFilesTypes = ['image/png', 'image/jpeg', 'image/pjpeg']

const isValidFile = (file) => acceptedFilesTypes.includes(file.type)

const AvatarUploadBtn = () => {

    const {isOpen, open, close} = useModalState()
    const[img, setImg] = useState(null)

    const onFileInputChange = (ev) => {
        const currentFiles = ev.target.files;

        if(currentFiles.length === 1){
            const file = currentFiles[0]

            if( isValidFile(file) ){
                setImg(file)
                open()
            } else {
                Alert.warning(`Wrong file type ${file.type}`,4000)
            }
        }
    }

    return (
        <div className="mt-3 text-center">
            <div>
                <label htmlFor="avatar-upload" className="d-block cursor-pointer padded">
                    Select new Avatar
                    <input id="avatar-upload" type="file" className="d-none" accept={fileInputTypes} onChange={onFileInputChange}/>
                </label>

                <Modal show={isOpen} onHide={close}>
                    <Modal.Header>
                        <Modal.Title>
                            Adjust and Upload new Avatar
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center align-items-center h-100">
                        {img &&
                            <AvatarEditor
                                image={img}
                                width={200}
                                height={200}
                                border={10}
                                borderRadius={100}
                                rotate={0}
                            />
                        
                        }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block appearance="ghost">
                            Upload new Avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default AvatarUploadBtn
