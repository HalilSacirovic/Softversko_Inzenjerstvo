import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import EditUserModal from "./EditUser";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/users"); // Povuci korisnike iz API-ja
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm(
      `Da li ste sigurni da želite da obrišete korisnika sa ID: ${id}?`
    );

    if (confirmDelete) {
      fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE", // Ova linija označava da je zahtev za brisanje
      })
        .then((response) => {
          if (response.ok) {
            alert(`Korisnik sa ID: ${id} je obrisan.`);
            // Osveži listu korisnika (ako koristiš neki metod za učitavanje korisnika)
            // Na primer, možeš ponovo pozvati funkciju koja vraća listu korisnika
            window.location.reload();
          } else {
            alert("Greška prilikom brisanja korisnika.");
          }
        })
        .catch((error) => {
          console.error("Greška pri komunikaciji sa serverom:", error);
          alert("Greška pri brisanju korisnika.");
        });
    }
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    console.log(selectedUser, "SELECTED USER");

    try {
      const response = await fetch(
        `http://localhost:5000/user/${selectedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedUser),
        }
      );

      if (response.ok) {
        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        );
        setUsers(updatedUsers); // Ažuriraj listu korisnika u UI-u
        alert("Korisnik je uspešno ažuriran.");
      } else {
        console.error("Failed to update user");
        alert("Greška prilikom ažuriranja korisnika.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Greška prilikom komunikacije sa serverom.");
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell> {/* Nova kolona za akcije */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>
                  {/* Dugmad za akcije */}
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Obriši
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUserModal
        open={open}
        user={selectedUser}
        onClose={handleClose}
        onSave={handleSave}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserTable;
