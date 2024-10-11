import React, { useState, useEffect } from 'react';
import { TextField, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const ActionPropertiesCard = ({ action, updateAction }) => {
  const [actionType, setActionType] = useState('');
  const [actionDescription, setActionDescription] = useState('');
  const [requirementType, setRequirementType] = useState('');
  const [blockingType, setBlockingType] = useState('');
  const [actionParameters, setActionParameters] = useState([]);

  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

  useEffect(() => {
    if (action) {
      setActionType(action.actionType || '');
      setActionDescription(action.actionDescription || '');
      setRequirementType(action.requirementType || '');
      setBlockingType(action.blockingType || '');
      setActionParameters(action.actionParameters || []);
    }
  }, [action]);

  const handleParameterChange = (index, key, value) => {
    const updatedParameters = [...actionParameters];
    updatedParameters[index] = { ...updatedParameters[index], [key]: value };
    setActionParameters(updatedParameters);
  };

  const addParameter = () => {
    setActionParameters([...actionParameters, { key: '', value: '' }]);
  };

  const removeParameter = (index) => {
    const updatedParameters = actionParameters.filter((_, i) => i !== index);
    setActionParameters(updatedParameters);
  };

  const handleBlur = (field, value) => {
    updateAction({ ...action, [field]: value });
  };

  const toggleSection = () => {
    setIsSectionExpanded(!isSectionExpanded);
  };

  return (
    <Accordion expanded={isSectionExpanded} onChange={toggleSection}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Action Properties</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Action Type"
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
          onBlur={(e) => handleBlur('actionType', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Action Description"
          value={actionDescription}
          onChange={(e) => setActionDescription(e.target.value)}
          onBlur={(e) => handleBlur('actionDescription', e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={2}
        />
        <TextField
          label="Requirement Type"
          value={requirementType}
          onChange={(e) => setRequirementType(e.target.value)}
          onBlur={(e) => handleBlur('requirementType', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Blocking Type"
          value={blockingType}
          onChange={(e) => setBlockingType(e.target.value)}
          onBlur={(e) => handleBlur('blockingType', e.target.value)}
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1" gutterBottom>
          Action Parameters
        </Typography>
        {actionParameters.map((param, index) => (
          <Box key={index} display="flex" alignItems="center" mb={1}>
            <TextField
              label="Key"
              value={param.key}
              onChange={(e) => handleParameterChange(index, 'key', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Value"
              value={param.value}
              onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
              fullWidth
              margin="normal"
            />
            <IconButton onClick={() => removeParameter(index)} color="secondary">
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        ))}
        <IconButton onClick={addParameter} color="primary">
          <AddCircleOutlineIcon />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  );
};

export default ActionPropertiesCard;