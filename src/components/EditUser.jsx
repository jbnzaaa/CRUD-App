// react library
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
  const {id} = useParams();
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState({
    id: '',
    avatar: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => setSelected(data.data))
    .catch((err) => console.log(err.message))
  }, [id])

  const handleUpdate = (e) => {
    e.preventDefault();

    setUpdating(true);

    fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email
      })
    })
    .then((response) => response.json())
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
          {updating && <span className='alert alert-info'>Updating user</span>}
        </div>
        <div className="modalBody">
          <form onSubmit={handleUpdate}>

            <img src={selected.avatar} alt="avatar" />

            <span>ID</span>
            <input type="text" name="id" defaultValue={selected.id} disabled/>

            <span>First Name</span>
            <input type="text" name='firstname' defaultValue={selected.first_name} onChange={(e) => setFirstname(e.target.value)} required />

            <span>Last Name</span>
            <input type="text" name='lastname' defaultValue={selected.last_name} onChange={(e) => setLastname(e.target.value)} required />

            <span>Email</span>
            <input type="text" name='email' defaultValue={selected.email} onChange={(e) => setEmail(e.target.value)} required />

            <div className="actionBtn">
              <input type="submit" value="Update User" id='updateBtn'/>
              <input type="button" value="Cancel" id='cancelBtn' onClick={() => handleCancel()}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUser

// issues:
// updating data not displaying to userData(table)
// due to not being able to access the table from
// parent to child component.

// functionalities:
// - user data is fetch based on user API url
// - alert displaying based on onClick event