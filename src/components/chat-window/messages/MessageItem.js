import React, { memo } from 'react'
import TimeAgo from 'timeago-react'
import { Button } from 'rsuite'
import ProfileAvatar from '../../ProfileAvatar'
import ProfileInfoBtnModal from './ProfileInfoBtnModal'
import PresenceDot from '../../PresenceDot'
import { useCurrentRoom } from '../../../context/current-room.context'
import { auth } from '../../../misc/firebase'
import IconBtnControl from './IconBtnControl'
import { useHover, useMediaQuery } from '../../../misc/custom-hook'
import ImgBtnModal from './ImgBtnModal'

const renderFileMessage = (files) => {

    if(  files.contentType.includes('image') ) {
        return <div className="height-220">
            <ImgBtnModal src={files.url} fileName={files.name} />
        </div>
    }
    if( files.contentType.includes('audio')){
        // eslint-disable-next-line jsx-a11y/media-has-caption
        return <audio controls>
            <source src={files.url} type="audio/mp3" />
            Your browser does not support the audio element
        </audio>
    }

    return <a href={files.url}>Download {files.name}</a>
}

const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {

    const { author, createdAt, text, file, likes, likeCount } = message

    const [selfRef, isHovered] = useHover()

    const isMobile = useMediaQuery(('(max-width: 992px)'))

    const isAdmin = useCurrentRoom( v => v.isAdmin )
    const admins = useCurrentRoom( v => v.admins )

    const isMsgAuthorAdmin = admins.includes(author.uid)
    const isAuthor = auth.currentUser.uid === author.uid

    const canGrantAdmin = isAdmin && !isAuthor

    const canShowIcons = isMobile || isHovered

    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid)

    return (
        <li className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`} ref={selfRef}> 
            <div className="d-flex align-items-center font-bolder mb-1">
                <PresenceDot uid={author.uid}/>
                <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="xs"/>
                
                <ProfileInfoBtnModal profile={author} appearance="link" className="p-0 ml-1 text-black">
                    {canGrantAdmin &&
                    <Button block onClick={ () => handleAdmin(author.uid) } color="blue">
                        {isMsgAuthorAdmin ? 'Remove admin permission' : 'Create Admin'}
                    </Button>
                    }
                </ProfileInfoBtnModal>
                <TimeAgo datetime={createdAt}
                className="font-normal text-black-45 ml-2"/>

                <IconBtnControl
                {...( isLiked ? { color: 'red' } : {})}
                isVisible={canShowIcons}
                iconName="heart"
                tooltip="like the message"
                onClick={ () => handleLike(message.id) }
                badgeContent={likeCount}/>

                {isAuthor &&
                <IconBtnControl
                
                isVisible={canShowIcons}
                iconName="close"
                tooltip="delete this message"
                onClick={ () => handleDelete(message.id, file) }
                />
                }

                </div>
            <div>
                { text && <span className="word-break-all">{text}</span> }
                { file && renderFileMessage(file) }
                
            </div>
        </li>
    )
}

export default memo(MessageItem)
