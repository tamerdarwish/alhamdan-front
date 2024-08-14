import React, { useState } from 'react';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    defaultWatermarkOption: 'none',
  });

  const handleSave = () => {
    // Logic to save settings
  };

  return (
    <div>
      <h1>Admin Settings</h1>
      <select
        value={settings.defaultWatermarkOption}
        onChange={(e) => setSettings({...settings, defaultWatermarkOption: e.target.value})}
      >
        <option value="none">No Watermark</option>
        <option value="partial">Partial Watermark</option>
        <option value="full">Full Watermark</option>
      </select>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default AdminSettingsPage;
