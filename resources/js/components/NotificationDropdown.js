import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,  Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { markAsRead } from '../actions/chatActions';

const NotificationDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [modal, setModal] = useState(false);
  const [modalAN, setANModal] = useState(false);
  const [value, setValue] = useState([]);


  const toggleModal = () => setModal(!modal);
  const toggleModalAN = () => setANModal(!modalAN);

  const { notifications, allNotifications, acceptRequest, getAllNotifications, unreadNotifs, markAsRead } = props;

  const notificationsList = notifications.map((value, index) => {
    return (
        <DropdownItem className={value.read_at ? "read": "unread"} key={index} onClick={() => acceptModalWrapper(value)} >
          <b>{value.data.sender_name}</b> {value.data.desc}
            <br></br>
        </DropdownItem>
    );
});


const allNotificationsList = allNotifications.map((value, index) => {
  return (
      <DropdownItem key={index} onClick={() => acceptModalWrapper(value)} >
          <b>{value.data.sender_name}</b> {value.data.desc}
          <br></br>
      </DropdownItem>
  );
})

function acceptRequestWrapper(invite_id) {
  acceptRequest(invite_id);
  toggleModal();
}

function getAllNotificationsWrapper() {
  getAllNotifications();
  toggleModalAN();
}

function acceptModalWrapper(value) {
  markAsRead(value.id);
  setValue(value.data);
  toggleModal();
}

function AcceptModal({sender_name, desc, toggleModal, modal, invite_id}) {
  return (
    <div>

       <Modal isOpen={modal} toggle={toggleModal} >
         <ModalHeader toggle={toggleModal}>Accept Request</ModalHeader>
         <ModalBody>
         <span>Do you want to accept <b>{sender_name}</b>'s friend request and add them to your Direct Message list?</span>
     </ModalBody>
         <ModalFooter>
         <Button color="success" onClick={() => acceptRequestWrapper(invite_id)}>Accept</Button>

           <Button color="danger" onClick={toggleModal}>Close Window</Button>

         </ModalFooter>
       </Modal>
     </div>
 )
}

function AllNotificationsModal({modalAN, toggleModalAN}) {

  return (
    <div>

       <Modal isOpen={modalAN} toggle={toggleModalAN} >
         <ModalHeader toggle={toggleModalAN}>All Notifications</ModalHeader>
         <ModalBody>
            {allNotificationsList}
     </ModalBody>
         <ModalFooter>

           <Button color="danger" onClick={toggleModalAN}>Close Window</Button>

         </ModalFooter>
       </Modal>
     </div>
 )
}

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color="secondary" size="lg" outline caret>
       Notifications &nbsp;
  <Badge color="primary"> {unreadNotifs}</Badge>
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem divider />
          {notificationsList}

        
        <DropdownItem divider />
        <DropdownItem className="text-primary text-center"  onClick={getAllNotificationsWrapper}>Show All Notifications</DropdownItem>
  <AllNotificationsModal modalAN={modalAN} toggleModalAN={toggleModalAN}/>
  <AcceptModal sender_name={value.sender_name} desc={value.desc} toggleModal={toggleModal} modal={modal} invite_id={value.invite_id}/> 

      </DropdownMenu>
    </Dropdown>
  );
}

export default NotificationDropdown;