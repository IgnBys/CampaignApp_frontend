import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import { useEmerald } from "../campaigns/EmeraldContext";

export default function Home() {
    const [campaigns, setCampaigns] = useState([])
    const { fetchEmeraldBalance } = useEmerald();

    useEffect(() => {
        loadCampaigns();
    }, []);

    const loadCampaigns = async () => {
        const result = await axios.get("http://localhost:8080/api/campaigns")
        setCampaigns(result.data);
    }

    const deleteCampaign = async (id) => {
        await axios.delete(`http://localhost:8080/api/campaigns/${id}`);
        loadCampaigns();
        fetchEmeraldBalance();

    };

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Campaign name</th>
                            <th scope="col">Keywords</th>
                            <th scope="col">Bid amount</th>
                            <th scope="col">Campaign fund</th>
                            <th scope="col">Status</th>
                            <th scope="col">Town</th>
                            <th scope="col">Radius</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            campaigns.map((campaigns, index) => (
                                <tr>
                                    <td>{campaigns.id}</td>
                                    <td>{campaigns.campaignName}</td>
                                    <td>{campaigns.keywords.join(", ")}</td>
                                    <td>{campaigns.bidAmount}</td>
                                    <td>{campaigns.campaignFund}</td>
                                    <td>{campaigns.status ? "On" : "Off"}</td>
                                    <td>{campaigns.town}</td>
                                    <td>{campaigns.radius}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/viewcampaign/${campaigns.id}`}
                                        >
                                            View
                                        </Link>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to={`/editcampaign/${campaigns.id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteCampaign(campaigns.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            Home</div>
    )
}
