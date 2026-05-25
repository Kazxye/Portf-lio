import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AchievementProvider } from './context/AchievementContext';   // ← ADD
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AchievementProvider>                                              {/* ← WRAP */}
            <App />
        </AchievementProvider>                                             {/* ← */}
    </React.StrictMode>
);