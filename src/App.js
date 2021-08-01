import React from 'react';
import AuthStates from './context/auth/AuthStates';
import AdminStates from './context/admin/AdminStates';
import ManagerStates from './context/manager/ManagerStates';
import AlertState from './context/alerts/AlertState';
import ERPSystem from './components/ERPSystem'
import './App.css';

function App() {
  return (
    <AlertState>
      <AuthStates>
        <AdminStates>
          <ManagerStates>
              <div className="App">
                <ERPSystem />
              </div>
          </ManagerStates>
        </AdminStates>
      </AuthStates>
    </AlertState>
  );
}

export default App;
