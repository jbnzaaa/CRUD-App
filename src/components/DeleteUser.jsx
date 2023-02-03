// react library
import React, { useEffect, useState } from 'react'
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';

function DeleteUser() {
  const {id} = useParams();
  const [test, setTest] = useState([]);
  const [selected, setSelected] = useState({
    id: '',
    avatar: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => setSelected(data.data))
    .catch((err) => console.log(err.message))
  }, [id])

  const handleDelete = () => {
    setDeleting(true);

    fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE'
    })
    // .then((response) => {
    //   if(response.status === 200){
    //     setSelected((user) => {
    //       return user.id !== id;
    //     })  
    //   } else{
    //     return;
    //   }
    // })
    .then((data) => {
      navigate('/users');
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

  const handleCancel = () => {
    navigate('/users');
  }

  return (
    <div className="modalContainer">
      <div className='createUserModal'>
        <div className='modalHeader'>
          <h3>Edit User</h3>
          {deleting && <span className='alert alert-danger'>Deleting user</span>}
        </div>
        <div className="modalBody">
          <div>
            <img src={selected.avatar} alt="avatar" />

            <span>ID</span>
            <input type="text" name="id" value={selected.id} disabled/>

            <span>First Name</span>
            <input type="text" name='firstname' defaultValue={selected.first_name} disabled />

            <span>Last Name</span>
            <input type="text" name='lastname' defaultValue={selected.last_name} disabled />

            <span>Email</span>
            <input type="text" name='email' defaultValue={selected.email} disabled />

            <div className="actionBtn">
              <input type="submit" value="Delete User" id='deleteBtn' onClick={() => handleDelete(selected.id)}/>
              <input type="button" value="Cancel" id='cancelBtn' onClick={() => handleCancel()}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteUser

// issues:
// deleting data not displaying to userData(table)
// due to not being able to access the table from
// parent to child component.

// functionalities:
// - user data is fetch based on user API url
// - alert displaying based on onClick event