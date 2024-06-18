import { Box, Button, Modal, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import "./RelationshipModal.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

function RelationshipModal({ open, node, onClose, onSave, onDelete, setAction, action, handleGoBack, formValidation, onExpandCollapse }) {
    const isEditAction = action == "Edit Relationship"
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (node && action == "Edit Relationship") {
            setName(node.name);
            setDescription(node.description);
        } else {
            setName("");
            setDescription("");
        }
    }, [action]);

    const handleSave = () => {
        onSave({ name, description });
    };

    return (
        <Modal open={open} onClose={onClose}>


            <Box sx={style} >
                {!action && (<div>
                    <div className='model-header-title'>Overview</div>
                    <div className='relationship-info'>
                        <div className='relationship-info-details'>
                            <span className='relationship-info-title'>Name : </span>
                            <span className='relationship-info-desc'>{node.name || "N/A"}</span>
                        </div>
                        <div className='relationship-info'>
                            <span className='relationship-info-title'>Description : </span>
                            <span className='relationship-info-desc'>{node.description || "N/A"}</span>

                        </div>
                    </div>

                    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={onDelete}
                            style={{ marginTop: '10px' }}
                        >
                            Delete Relationship
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '10px' }}
                            onClick={() => setAction('Add Relationship')}
                        >
                            Add Relationship
                        </Button>
                    </Stack>
                </div>)
                }


                {action && (
                    <Box mt={2}>
                        <h2 className='align-center'>{isEditAction ? "Edit New Relationship" : "Add New Relationship"}</h2>
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            margin="normal"
                        />
                        {formValidation && <span className='error-text'>Please enter all the details.</span>}

                        <div className='add-relationship-btn'>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleGoBack}
                                style={{ marginTop: '10px' }}
                            >
                                Go Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                style={{ marginTop: '10px' }}
                            >
                                Save
                            </Button>
                        </div>
                    </Box>
                )}
            </Box>
        </Modal>
    );
}

export default RelationshipModal;