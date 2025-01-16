import React from "react";
import { Modal, Box, Button, TextField } from "@mui/material";

const EditUserModal = ({ open, user, onClose, onSave, onChange }) => {
  if (!user) return null;

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh", // Maximalna visina modala
            overflow: "auto", // Omogućava skrolovanje kada je sadržaj prevelik
          }}
        >
          <h2>Edit User</h2>

          <TextField
            label="First Name"
            name="first_name"
            value={user.first_name}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={user.last_name}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Username"
            name="username"
            value={user.username}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={user.city}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            name="country"
            value={user.country}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={user.address}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={user.phone_number}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Profile Picture URL"
            name="profile_picture_url"
            value={user.profile_picture_url}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bio"
            name="bio"
            value={user.bio}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Created At"
            name="created_at"
            value={new Date(user.created_at).toLocaleDateString()}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Is Admin"
            name="isAdmin"
            value={user.isAdmin ? 1 : 0}
            onChange={onChange}
            //   disabled
            fullWidth
            margin="normal"
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditUserModal;
