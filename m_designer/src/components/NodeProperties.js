import React, { useState, useEffect } from 'react';
import './NodeProperties.css';

const NodeProperties = ({ selectedElement, updateElement }) => {
    const [newLabel, setNewLabel] = useState('');
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        if (selectedElement) {
            setNewLabel(selectedElement.label || '');
            setNewName(selectedElement.id || '');
            setNewDescription(selectedElement.description || '');
            setNewPosition(selectedElement.position || { x: 0, y: 0 });
        }
    }, [selectedElement]);
    
    const handleSubmit = () => {
        if (selectedElement && newLabel !== '') {
            updateElement(selectedElement.id, {
                label: newLabel,
                id: newName,
                description: newDescription,
                position: newPosition,
            });
        }
    };
    
    const toggleSection = (section) => {
        const content = document.getElementById(section);
        content.classList.toggle('active');
    };
    
    return (
        <div className="property">
            <div className="section">
                <div className="section-title" onClick={() => toggleSection('basic-info')}>Basic Information</div>
                <div className="section-content" id="basic-info">
                    <label>Node Label:</label>
                    <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                    />
                    <label>Node Name:</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <label>Node Description:</label>
                    <textarea
                        className='vertical-resize-textarea'       
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <label>Node Position:</label>
                    <input
                        type="number"
                        value={newPosition?.x}
                        onChange={(e) => setNewPosition({ ...newPosition, x: e.target.value })}
                    />
                    <input
                        type="number"
                        value={newPosition?.y}
                        onChange={(e) => setNewPosition({ ...newPosition, y: e.target.value })}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    ); 
};
    export default NodeProperties;