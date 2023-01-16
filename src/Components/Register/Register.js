import React from 'react'
import "./Register.css"

export default function Register() {
  return (
    <div className="regis_main">
      <div className="register">
        <div className="regi_title">Register</div>
        <div class="box">
          <span class="material-symbols-outlined">mail</span>
          <input type="text" name="" placeholder="Email" />
        </div>
        <div class="box">
          <span class="material-symbols-outlined">person</span>
          <input type="text" name="" placeholder="Username" />
        </div>
        <div class="box">
          <span class="material-symbols-outlined">key</span>
          <input type="text" name="" placeholder="Password" />
        </div>
        <div className="nav_regis">Register</div>
      </div>
    </div>
  );
}
