import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewCampaign() {

        const [campaign, setCampaign] = useState({
            campaignName: "",
            keywords: [],
            bidAmount: "",
            campaignFund: "",
            status: "",
            town: "",
            radius: "",
        });
    

        const { id } = useParams();

        useEffect(() => {
          loadCampaign();
        }, []);
      
        const loadCampaign = async () => {
          const result = await axios.get(`http://localhost:8080/api/campaigns/${id}`);
          setCampaign(result.data);
        };
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
              <h2 className="text-center m-4">Campaign Details</h2>
    
              <div className="card">
                <div className="card-header">
                  Details of campaign id : {campaign.id}
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <b>Campaign name: </b>
                      {campaign.campaignName}
                    </li>
                    <li className="list-group-item">
                      <b>Keywords: </b>
                      {campaign.keywords.join(", ")}
                    </li>
                    <li className="list-group-item">
                      <b>Bid amount: </b>
                      {campaign.bidAmount}
                    </li>
                    <li className="list-group-item">
                      <b>Campaign fund: </b>
                      {campaign.campaignFund}
                    </li>
                    <li className="list-group-item">
                      <b>Status: </b>
                      {campaign.status ? "On" : "Off"}
                    </li>
                    <li className="list-group-item">
                      <b>Town: </b>
                      {campaign.town}
                    </li>
                    <li className="list-group-item">
                      <b>Radius: </b>
                      {campaign.radius}
                    </li>
                  </ul>
                </div>
              </div>
              <Link className="btn btn-primary my-2" to={"/"}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
}
