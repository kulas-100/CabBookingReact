
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';

const Location = () => {
  return (
    <div>
      <AdminLayout/>
      <div className="card">
        <div className="card-header bg-secondary text-white">
          Routes
        </div>
        <div className="card-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to='/addRoute' className="nav-link">Create Routes</Link>
            </li>
            <li className="nav-item">
              <Link to='/displayRoute' className="nav-link">Display Routes</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Location;
