// react library
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [user, setUser] = useState([]);
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch('https://reqres.in/api/users?page=1')
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setNewUser(data.data);
  //   })
  //   .catch((err) => console.log(err.message));
  // }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();

    setCreating(true);
    
    // const userInputs = {first_name, last_name, email};

    await fetch('https://reqres.in/api/users?page=1', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        id: Math.floor(Math.random() * 100) + 12,
        first_name: first_name,
        last_name: last_name,
        email: email
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);  
      // setUserData((userData) => [data, ...userData]);
      // navigate('/users');
      setFirstname('');
      setLastname('');
      setEmail('');
    })
    .catch((err) => console.log(err.message))
  }

  // const test = () => {
  //   setNewUser('first_name, last_name, email')
  // }

  const handleCancel = () => {
    navigate('/users');
  }

  return (
    <div className="modalContainer">
      <div className='createUserModal'>
        <div className='modalHeader'>
          <h3>Edit User</h3>
          {creating && <span className='alert alert-info'>Creating new user</span>}
        </div>
        {/* {newUser.map((user, index) => {
          return (
            <div key={index}>
              <p>{user.email}</p> 
            </div>
          )
        })} */}
        <div className="modalBody">
          <form onSubmit={handleSubmit}>
            <span>First Name</span>
            <input type="text" name='firstname' defaultValue={first_name} onChange={(e) => setFirstname(e.target.value)} required />

            <span>Last Name</span>
            <input type="text" name='lastname' defaultValue={last_name} onChange={(e) => setLastname(e.target.value)} required />

            <span>Email</span>
            <input type="text" name='email' defaultValue={email} onChange={(e) => setEmail(e.target.value)} required />

            <div className="actionBtn">
              <input type="submit" value="Create User" id='createBtn' />
              <input type="button" value="Cancel" id='cancelBtn' onClick={() => handleCancel()}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUser