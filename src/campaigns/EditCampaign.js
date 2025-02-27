import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function EditCampaign() {

    let navigate = useNavigate();
    const { id } = useParams();
    const minBidAmount = 100;
    const towns = ["Kraków", "Warszawa", "Poznań", "Wrocław", "Gdańsk", "Lublin", "Szczecin"];
    const keywordOptions = ["Marketing", "Advertising", "SEO", "PPC", "Branding", "Technology"];
    const [campaign, setCampaign] = useState({
        campaignName: "",
        keywords: [],
        bidAmount: "",
        campaignFund: "",
        status: true,
        town: towns[0],
        radius: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!campaign.campaignName.trim()) newErrors.campaignName = "Campaign Name is required";
        if (campaign.keywords.length === 0) newErrors.keywords = "At least one keyword is required";
        if (!campaign.bidAmount || isNaN(campaign.bidAmount)) newErrors.bidAmount = "Bid amount is required";
        else if (parseFloat(campaign.bidAmount) < minBidAmount) newErrors.bidAmount = `Bid amount must be at least ${minBidAmount}`;
        if (!campaign.campaignFund || isNaN(campaign.campaignFund)) newErrors.campaignFund = "Campaign fund is required";
        if (campaign.status === undefined || campaign.status === null) newErrors.status = "Status is required";
        if (!campaign.town.trim()) newErrors.town = "Town is required";
        if (!campaign.radius || isNaN(campaign.radius)) newErrors.radius = "Radius is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onKeywordsChange = (selected) => {
        setCampaign({ ...campaign, keywords: selected });
    };

    const onStatusChange = (e) => {
        setCampaign({ ...campaign, status: e.target.value === "On" });
    };

    const { campaignName, keywords, bidAmount, campaignFund, status, town, radius } = campaign;

    const onInputChange = (e) => {
        setCampaign({ ...campaign, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        loadCampaign();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        await axios.put(`http://localhost:8080/api/campaigns/${id}`, {
            ...campaign,
            status: campaign.status,
            bidAmount: parseFloat(campaign.bidAmount),
            campaignFund: parseFloat(campaign.campaignFund),
            radius: parseInt(campaign.radius),
        });

        navigate("/");
    };

    const loadCampaign = async () => {
        const result = await axios.get(`http://localhost:8080/api/campaigns/${id}`);
        setCampaign(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Campaign</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="CampaignName" className="form-label">
                                Campaign Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter campaign name"
                                name="campaignName"
                                value={campaignName}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.campaignName && <small className="text-danger">{errors.campaignName}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Keywords" className="form-label">Keywords </label>
                            <Typeahead
                                id="keywords"
                                multiple
                                onChange={onKeywordsChange}
                                options={keywordOptions}
                                placeholder="Choose keywords..."
                                selected={campaign.keywords}
                            />
                            {errors.keywords && <small className="text-danger">{errors.keywords}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="BidAmount" className="form-label">
                                Bid amount
                            </label>
                            <input
                                type={"number"}
                                className="form-control"
                                placeholder="Enter bid amount"
                                name="bidAmount"
                                value={bidAmount}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.bidAmount && <small className="text-danger">{errors.bidAmount}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="CampaignFund" className="form-label">
                                Campaign fund
                            </label>
                            <input
                                type={"number"}
                                className="form-control"
                                placeholder="Enter campaign fund"
                                name="campaignFund"
                                value={campaignFund}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.campaignFund && <small className="text-danger">{errors.campaignFund}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Status" className="form-label">
                                Status
                            </label>
                            <select
                                className="form-control"
                                name="status"
                                value={campaign.status ? "true" : "false"}
                                onChange={(e) => setCampaign({ ...campaign, status: e.target.value === "true" })}
                            >
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                            {errors.status && <small className="text-danger">{errors.status}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Town" className="form-label">Town</label>
                            <select
                                className="form-control"
                                name="town"
                                value={town}
                                onChange={onInputChange}
                            >
                                {towns.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            {errors.town && <small className="text-danger">{errors.town}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Radius" className="form-label">
                                Radius
                            </label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter radius"
                                    name="radius"
                                    value={radius}
                                    onChange={onInputChange}
                                />
                                <span className="input-group-text">km</span>
                            </div>
                            {errors.radius && <small className="text-danger">{errors.radius}</small>}
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
