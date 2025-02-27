import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddCampaign() {
  let navigate = useNavigate();

  const [campaign, setCampaign] = useState({
    campaignName: "",
    keywords: "",
    bidAmount: "",
    campaignFund: "",
    status: "",
    town: "",
    radius: "",
  });

  const { campaignName, keywords, bidAmount, campaignFund, status, town, radius } = campaign;

  const onInputChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/campaigns", campaign);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Campaign</h2>

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
            </div>
            <div className="mb-3">
              <label htmlFor="Keywords" className="form-label">
                Keywords
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter keywords"
                name="keywords"
                value={keywords}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="BidAmount" className="form-label">
                Bid amount
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter bid amount"
                name="bidAmount"
                value={bidAmount}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="CampaignFund" className="form-label">
                Campaign fund
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter campaign fund"
                name="campaignFund"
                value={campaignFund}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Status" className="form-label">
                Status
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter status"
                name="status"
                value={status}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Town" className="form-label">
                Town
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter town"
                name="town"
                value={town}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Radius" className="form-label">
                Radius
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter radius"
                name="radius"
                value={radius}
                onChange={(e) => onInputChange(e)}
              />
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
  );
}