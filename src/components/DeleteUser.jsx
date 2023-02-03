// react library
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function DeleteUser() {
  const {id} = useParams();
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

  const handleDelete = (e) => {
    e.preventDefault();

    setDeleting(true);
    
    fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      console.log(response);

      // if(response.status === 200){
      //   setUserData(
      //     userData.filter((usser) => {
      //       return usser.id !== id;
      //     })  
      //   )
      // } else{
      //   return;
      // }

      // navigate('/users')
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
          <form onSubmit={handleDelete}>
            <img src={selected.avatar} alt="avatar" />

            <span>ID</span>
            <input type="text" name="id" value={selected.id} disabled/>

            <span>First Name</span>
            <input type="text" name='firstname' value={selected.first_name} disabled />

            <span>Last Name</span>
            <input type="text" name='lastname' value={selected.last_name} disabled />

            <span>Email</span>
            <input type="text" name='email' value={selected.email} disabled />

            <div className="actionBtn">
              <input type="submit" value="Delete User" id='deleteBtn'/>
              <input type="button" value="Cancel" id='cancelBtn' onClick={() => handleCancel()}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DeleteUser