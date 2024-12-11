import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Link,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

const TableCarriere = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);




    const jobs = [
        { role: 'Business Systems Analyst', location: 'Boston', department: 'Consulting' },
        { role: 'Senior Sales Executive', location: 'London', department: 'Sales & Client Management' },
        { role: 'Client Success Manager', location: 'Boston', department: 'Client Services' },
        { role: 'Senior Analyst - Operations - US Shift', location: 'Mumbai', department: 'Client Services' },
        { role: 'Team Lead Private Credit', location: 'Mumbai', department: 'Client Services' },
        { role: 'Senior Software developer .NET', location: 'Tunis', department: 'Software Engineering' },
        { role: 'Junior Development Consultant M/F', location: 'Sintra - COE', department: 'Software Engineering' },
    ];

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    const filteredJobs = jobs.filter((job) =>
        job.role.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (department === '' || job.department === department) &&
        (location === '' || job.location === location)
    );

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        cv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        // Add form submission logic here
    };

    return (
        <div className="container my-4">
            <div className="row mb-3">
                <div className="col-md-8 ">
                    <h1>21 Postes ouverts</h1>
                </div>

                <div className="col-md-4 ">
              

                  <Link onClick={ClickHandler} href="/spontanee"> <Button
                        variant="contained"
                        style={{ backgroundColor: '#BF9043', color: '#fff' }}
                        
                    >
                        Candidature Spontanée
                    </Button></Link>

                </div>

            </div>



            <div className="row mb-3">
                <div className="col-md-4 mb-2">
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="department-select">Département</InputLabel>
                        <Select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            label="Département"
                            inputProps={{
                                id: 'department-select',
                            }}
                        >
                            <MenuItem value="">Tous les départements</MenuItem>
                            <MenuItem value="Pôle immobilier">Pôle immobilier</MenuItem>
                            <MenuItem value="Gracia Services">Gracia Services</MenuItem>
                            <MenuItem value="Leaders import & export">Leaders import & export</MenuItem>
                            <MenuItem value="Leaders business">Leaders business</MenuItem>
                            <MenuItem value="Leaders Fish">Leaders Fish</MenuItem>
                            <MenuItem value="Leaders Makeup">Leaders Makeup</MenuItem>
                            <MenuItem value="IBC">IBC</MenuItem>
                            <MenuItem value="Leaders Travel">Leaders Travel</MenuItem>
                            <MenuItem value="Leaders Digital">Leaders Digital</MenuItem>

                        </Select>
                    </FormControl>
                </div>


                <div className="col-md-4 mb-2">
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="location-select">Localisation</InputLabel>
                        <Select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            label="Localisation"
                            inputProps={{
                                id: 'location-select',
                            }}
                        >
                            <MenuItem value="">Toutes les localisations</MenuItem>
                            <MenuItem value="Tunis">Tunis</MenuItem>
                            <MenuItem value="Nabeul">Nabeul</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="col-md-4">
                    <TextField
                        fullWidth
                        label="Rechercher un rôle"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Liste des Offres</h3>

            </div>

            <table className="table table-bordered table-hover">
                <thead style={{ backgroundColor: '#BF9043', color: 'white' }}>
                    <tr>
                        <th>Rôle</th>
                        <th>Localisation</th>
                        <th>Département</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobs.map((job, index) => (
                        <tr key={index}>
                        <td>{job.role}</td>
                        <td>{job.location}</td>
                        <td>{job.department}</td>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                          <Button
                            variant="contained"
                            size="small"
                            style={{ backgroundColor: '#BF9043', color: '#fff' }}
                            onClick={() => {
                              setSelectedJob(job);
                              setShowJobModal(true);
                            }}
                          >
                            Voir l'offre
                          </Button>
                        </td>
                      </tr>
                      
                    ))}
                </tbody>
            </table>

            <section className="wpo-support-section">
                <div className="container">
                    <div className="wpo-support-wrapper">
                        <div className="wpo-support-text">
                            <h2>Rejoignez notre Réserve de Talents</h2>
                            <p>Rejoignez notre réserve de talents en soumettant simplement votre CV. Nous vous informerons des nouvelles opportunités correspondant à votre profil et vous tiendrons informé si vous êtes le candidat idéal pour l'un de nos postes ouverts.</p>
                        </div>
                        <div className="wpo-support-btn">
                            <Link href="/spontanee">Soumettre votre CV</Link>
                        </div>

                    </div>
                </div>
            </section>

       
        </div>
    );
};

export default TableCarriere;
