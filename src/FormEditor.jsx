import React, { useState } from 'react';
import './FormEditor.css';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function FormEditor() {
  const [view, setView] = useState('welcome');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('Welcome to the Form Editor');
  const [description, setDescription] = useState('This is a form editor where you can customize forms.');
  const [image, setImage] = useState(null);
  const [imagePlacement, setImagePlacement] = useState('right');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (!username || !isValidEmail(email)) {
      setLoginError('Please enter a valid email address and username.');
    } else {
      setView('settings');
      setLoginError('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSave = () => {
    setView('success');
  };

  const handlePlacementChange = (placement) => {
    setImagePlacement(placement);
  };

  const handleDiscard = () => {
    setImage(null);
    setTitle('Welcome to the Form Editor');
    setDescription('This is a form editor where you can customize forms.');
  };

  if (view === 'welcome') {
    return (
      <div className="main-container">
        <div className="welcome-page">
          <div className="welcome-text">
            <h1>{title}</h1>
            <p>{description}</p>
            <button onClick={() => setView('login')} className="email-btn">Email</button>
          </div>
          {image && (
            <div className={`welcome-image ${imagePlacement}`}>
              <img src={image} alt="Uploaded" />
            </div>
          )}
        </div>
        <div className="settings-panel">
          <h1>Settings</h1>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          {image && (
            <div className="image-preview">
              <button onClick={() => handlePlacementChange('left')} className="btn placement-btn">Left</button>
              <button onClick={() => handlePlacementChange('right')} className="btn placement-btn">Right</button>
              <div className={`image-container ${imagePlacement}`}>
                <img src={image} alt="Uploaded" />
              </div>
              <button onClick={removeImage} className="btn remove-btn">Remove Image</button>
            </div>
          )}
          <div className="button-group">
            <button onClick={handleSave} className="btn">Save</button>
            <button onClick={handleDiscard} className="btn discard-btn">Discard</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className="login-container">
        <div className="login-frame">
          <h1>Login</h1>
          <p>Please enter your username and email to continue.</p>
          <div className="login-field">
            <label htmlFor="username" style={{ color: 'black' }}>Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="login-field">
            <label htmlFor="email" style={{ color: 'black' }}>Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {loginError && <p className="error">{loginError}</p>}
          </div>
          <button onClick={handleLogin} className="btn">Submit</button>
        </div>
      </div>
    );
  }

  if (view === 'settings') {
    return (
      <div className="main-container">
        <div className="welcome-page">
          <div className="welcome-text">
            <h1>{title}</h1>
            <p>{description}</p>
            <button onClick={() => setView('login')} className="btn">Logout</button>
          </div>
          {image && (
            <div className={`welcome-image ${imagePlacement}`}>
              <img src={image} alt="Uploaded" />
            </div>
          )}
        </div>
        <div className="settings-panel">
          <h1>Settings</h1>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          {image && (
            <div className="image-preview">
              <button onClick={() => handlePlacementChange('left')} className="btn placement-btn">Left</button>
              <button onClick={() => handlePlacementChange('right')} className="btn placement-btn">Right</button>
              <div className={`image-container ${imagePlacement}`}>
                <img src={image} alt="Uploaded" />
              </div>
              <button onClick={removeImage} className="btn remove-btn">Remove Image</button>
            </div>
          )}
          <div className="button-group">
            <button onClick={handleSave} className="btn">Save</button>
            <button onClick={handleDiscard} className="btn discard-btn">Discard</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'success') {
    return (
      <div className="success-message">
        <h1>Success!</h1>
        <p>Your form settings have been saved successfully.</p>
        <button onClick={() => setView('welcome')} className="btn">Back to Welcome</button>
      </div>
    );
  }

  return null;
}

export default FormEditor;
