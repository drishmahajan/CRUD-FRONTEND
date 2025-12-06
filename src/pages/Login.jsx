import React, { useState } from 'react';
import API, { setAccessToken } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await API.post('/auth/login', form);
      setAccessToken(r.data.accessToken);
      localStorage.setItem('user', JSON.stringify(r.data.user));
      localStorage.setItem('accessToken', r.data.accessToken);
      nav('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{
      height:"100vh", width:"100%",
      display:"flex", justifyContent:"center", alignItems:"center",
      background:"#eef2f3"
    }}>

      <div style={{
        width:350, padding:30, borderRadius:12,
        background:"#fff",
        boxShadow:"0 4px 18px rgba(0,0,0,0.15)"
      }}>

        <h2 style={{textAlign:"center", marginBottom:20}}>Login</h2>

        <form onSubmit={submit} style={{display:"flex", flexDirection:"column", gap:15}}>
          <input 
            placeholder="Email"
            style={styles.input}
            value={form.email}
            onChange={e=>setForm({...form,email:e.target.value})}
          />

          <input 
            placeholder="Password"
            type="password"
            style={styles.input}
            value={form.password}
            onChange={e=>setForm({...form,password:e.target.value})}
          />

          <button style={styles.button} type="submit">Login</button>
        </form>

        <p style={{textAlign:"center", marginTop:10}}>
          New user?
          <span 
            style={styles.link} 
            onClick={()=>nav('/register')}
          > Register</span>
        </p>

      </div>

    </div>
  );
}

const styles = {
  input:{
    padding:"12px 14px",
    borderRadius:8,
    border:"1px solid #ccc",
    outline:"none",
    fontSize:15
  },
  button:{
    padding:"12px",
    borderRadius:8,
    background:"#4a90e2",
    border:"none",
    color:"#fff",
    fontSize:16,
    cursor:"pointer"
  },
  link:{
    marginLeft:5,
    color:"#4a90e2",
    cursor:"pointer",
    fontWeight:"bold"
  }
};
