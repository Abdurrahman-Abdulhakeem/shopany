import Base from '../components/Base'
import { Hamburger } from '../components/Sidebar'
import { useState } from 'react'

function Profile() {

    const [pswd, setPswd] = useState({
        password: '',
        newPassword: ''
    })

    const {password, newPassword} = pswd

    const handlePswds = (e) => {
        setPswd((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Base>


            <main className="dashboard">

          <Hamburger />

                <div className="profile">
                    <div className="profile-bg">
                        <img src="images/rrammy.jpg" alt="profile-bg" />
                        <div>
                            <input type="file" hidden id="profile-pic" accept="image/*" />
                            <label for="profile-pic" className="btn">Update Image</label>
                        </div>
                    </div>
                    <div className="profile-details">
                        <p className="view">Rammy</p>
                        <p className="view">Rammy</p>
                    </div>
                    <div className="profile-details">
                        <p className="view">rammy@gmail.com</p>
                        <p className="view">08000000000</p>
                    </div>

                    <div className="password-section">
                        <h2>Change Password</h2>
                        <div>
                            <input type="password" name="password" value={password} onChange={(e) =>handlePswds(e)} placeholder="New password" />
                        </div>
                        <div>
                            <input type="password" name="newPassword" value={newPassword} onChange={(e) =>handlePswds(e)} placeholder="Confirm new password" />
                        </div>
                        <input type="submit" value="Change Password" className="btn" />
                    </div>
                </div>

            </main>



        </Base >
    )
}

export default Profile