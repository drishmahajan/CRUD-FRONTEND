import React, { useEffect, useState } from 'react';
import API, { setAccessToken } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token){ nav('/login'); return; }
    setAccessToken(token);
    load();
  }, []);

  const load = async () => {
    try {
      const r = await API.get('/tasks');
      setTasks(r.data);
    } catch {
      alert("Error loading tasks");
    }
  };

  const create = async () => {
    try {
      await API.post('/tasks', { title });
      setTitle('');
      load();
    } catch {
      alert("Error creating task");
    }
  };

  const remove = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      load();
    } catch {
      alert("Error deleting task");
    }
  };

  const logout = () => {
    localStorage.clear();
    nav('/login');
  };

  return (
    <div style={{
      height:"100vh", width:"100%",
      display:"flex", justifyContent:"center", alignItems:"center",
      background:"#e0e7ff"
    }}>

      <div style={{
        width:420, padding:30, borderRadius:12,
        background:"rgba(255,255,255,0.94)",
        backdropFilter:"blur(7px)",
        boxShadow:"0 4px 22px rgba(0,0,0,0.15)"
      }}>

        <h2 style={{textAlign:"center", marginBottom:20}}>Task Dashboard</h2>

        <div style={{display:"flex", gap:10, marginBottom:20}}>
          <input 
            style={styles.input}
            placeholder="New task title"
            value={title}
            onChange={e=>setTitle(e.target.value)}
          />
          <button style={styles.addBtn} onClick={create}>Add</button>
        </div>

        <ul style={{listStyle:"none", padding:0, margin:0}}>
          {tasks.map(t => (
            <li key={t._id} style={styles.listItem}>
              <span>{t.title}</span>
              <button style={styles.deleteBtn} onClick={()=>remove(t._id)}>Delete</button>
            </li>
          ))}
        </ul>

        <button style={styles.logoutBtn} onClick={logout}>Logout</button>

      </div>

    </div>
  );
}

const styles = {
  input:{
    flex:1,
    padding:"12px",
    borderRadius:8,
    border:"1px solid #ccc",
    outline:"none"
  },
  addBtn:{
    padding:"12px 18px",
    borderRadius:8,
    background:"#16a34a",
    color:"#fff",
    border:"none",
    cursor:"pointer"
  },
  listItem:{
    padding:"12px 14px",
    background:"#fff",
    borderRadius:8,
    marginBottom:10,
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    boxShadow:"0 2px 10px rgba(0,0,0,0.08)"
  },
  deleteBtn:{
    background:"#dc2626",
    border:"none",
    padding:"6px 12px",
    borderRadius:6,
    color:"#fff",
    cursor:"pointer"
  },
  logoutBtn:{
    width:"100%",
    marginTop:20,
    padding:"12px",
    borderRadius:8,
    background:"#4a90e2",
    border:"none",
    color:"#fff",
    cursor:"pointer"
  }
};
