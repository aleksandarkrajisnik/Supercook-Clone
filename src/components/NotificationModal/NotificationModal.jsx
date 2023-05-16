import React from 'react'
import './NotificationModal.scss'
import OutsideAlerter from '../../app/hoc/OutsideAlerter'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotificationModal } from '../../app/redux/modalSlice'

const NotificationModal = () => {

  const dispatch = useDispatch();
  const { title, message, actionButtonText, onActionButtonClick, closeButtonText } = useSelector(state => state.modal.modalContent);

  return (
    <div className='overlay'>
      <OutsideAlerter handleOutsideClick = {() => dispatch(hideNotificationModal())}>
        <div className="notificationModal">
          <div className="modalTitle">
            <h2>{title}</h2>
          </div>
          <div className="modalMessage">
            <p>{message}</p>
          </div>
          <div className="modalActions">
            <button 
              className={actionButtonText ? 'closeBtn' : 'actionBtn'}
              onClick={() => dispatch(hideNotificationModal())}
            >
                {closeButtonText}
            </button>
            {actionButtonText && <button className='actionBtn' onClick={onActionButtonClick}>{actionButtonText}</button>}
          </div>
        </div>
      </OutsideAlerter>
    </div>
  )
}

export default NotificationModal