import React from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";

const CondidatureSpontanee = () => {
    return (
        <Box
            component="form"
            sx={{
                maxWidth: 800,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
            }}
        >
            <Typography
                variant="h5"
                component="h2"
                sx={{ gridColumn: "1 / -1", marginBottom: 2 }}
            >
                Candidature spontanée
            </Typography>

            <TextField label="Nom et Prénom" fullWidth required />
            <TextField label="Diplôme" fullWidth required />
            <TextField label="Adresse" fullWidth required />
            <TextField label="Spécialité" fullWidth required />

            <TextField
                select
                label="Sexe"
                fullWidth
                required
                defaultValue=""
            >
                <MenuItem value="">Sélectionner</MenuItem>
                <MenuItem value="Male">Masculin</MenuItem>
                <MenuItem value="Female">Féminin</MenuItem>
            </TextField>

            <TextField
                select
                label="Nombre d'années d'expériences"
                fullWidth
                required
                defaultValue=""
            >
                <MenuItem value="">Sélectionner</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3+">3+</MenuItem>
            </TextField>

            <TextField
                select
                label="Situation familiale"
                fullWidth
                required
                defaultValue=""
            >
                <MenuItem value="">Sélectionner</MenuItem>
                <MenuItem value="Single">Célibataire</MenuItem>
                <MenuItem value="Married">Marié(e)</MenuItem>
            </TextField>

            <TextField label="Numéro CIN" fullWidth required />
            <TextField label="Nationalité" fullWidth required />
            <TextField label="Adresse e-mail" fullWidth required />
            <TextField label="Lieu de naissance" fullWidth required />

            <TextField
                select
                label="Permis de conduire"
                fullWidth
                required
                defaultValue=""
            >
                <MenuItem value="">Sélectionner</MenuItem>
                <MenuItem value="Yes">Oui</MenuItem>
                <MenuItem value="No">Non</MenuItem>
            </TextField>

            <TextField
                type="date"
                label="Date de naissance"
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
            />
            <TextField label="Téléphone" fullWidth required />

            <Box gridColumn="1 / -1">
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Lettre de motivation
                </Typography>
                <Button variant="outlined" component="label">
                    Choisir un fichier
                    <input type="file" hidden />
                </Button>
            </Box>

            <Box gridColumn="1 / -1">
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    CV
                </Typography>
                <Button variant="outlined" component="label">
                    Choisir un fichier
                    <input type="file" hidden />
                </Button>
            </Box>

            

            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ gridColumn: "1 / -1" }}
            >
                Envoyer
            </Button>
        </Box>
    );
};

export default CondidatureSpontanee;
