import React, { useState, useEffect } from 'react';
import './Properties_card.css';

const NodeProperties = ({ selectedElement, updateElement }) => {
    const [newLabel, setNewLabel] = useState('');
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });
    const [isSectionExpanded, setIsSectionExpanded] = useState(true); // State to manage section expansion

    useEffect(() => {
        if (selectedElement) {
            setNewLabel(selectedElement.label || '');
            setNewName(selectedElement.id || '');
            setNewDescription(selectedElement.description || '');
            setNewPosition(selectedElement.position || { x: 0, y: 0 });
        }
    }, [selectedElement]);

    const handleBlur = (field, value) => {
        if (selectedElement) {
            updateElement(selectedElement.id, { [field]: value });
        }
    };

    const toggleSection = () => {
        setIsSectionExpanded(!isSectionExpanded);
    };

    return (
        <div className="property">
            <div className="section">
                <div className="section-title" onClick={toggleSection}>Basic Information</div>
                <div className={`section-content ${isSectionExpanded ? 'active' : ''}`} id="basic-info">
                    <label>Node Label:</label>
                    <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        onBlur={(e) => handleBlur('label', e.target.value)}
                    />
                    <label>Node Name:</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={(e) => handleBlur('id', e.target.value)}
                    />
                    <label>Node Description:</label>
                    <textarea
                        className='vertical-resize-textarea'
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        onBlur={(e) => handleBlur('description', e.target.value)}
                    />
                    <label>Node Position:</label>
                    <input
                        type="number"
                        value={newPosition?.x}
                        onChange={(e) => setNewPosition({ ...newPosition, x: e.target.value })}
                        onBlur={(e) => handleBlur('position', { ...newPosition, x: e.target.value })}
                    />
                    <input
                        type="number"
                        value={newPosition?.y}
                        onChange={(e) => setNewPosition({ ...newPosition, y: e.target.value })}
                        onBlur={(e) => handleBlur('position', { ...newPosition, y: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};

export default NodeProperties;