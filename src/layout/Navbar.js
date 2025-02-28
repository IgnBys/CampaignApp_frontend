import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { EmeraldContext } from "../campaigns/EmeraldContext";

export default function Navbar() {
    const { emeraldBalance } = useContext(EmeraldContext);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Campaign Application
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex justify-content-center w-100">
                            <span className="navbar-text text-white fs-4">
                                Current Emerald Balance: {emeraldBalance} $
                            </span>
                        </div>
                    <Link className="btn btn-outline-light" to="/addcampaign">
                        Add Campaign
                    </Link>
                </div>
            </nav>
        </div>
    )
}
