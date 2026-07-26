import "./Analytics.css";

import { useEffect, useState } from "react";

import AnalyticsHero from "../components/Analytics/AnalyticsHero";
import AnalyticsCards from "../components/Analytics/AnalyticsCards";
import AnalyticsCharts from "../components/Analytics/AnalyticsCharts";
import AnalyticsActivity from "../components/Analytics/AnalyticsActivity";
import AnalyticsInsights from "../components/Analytics/AnalyticsInsights";

import { getAnalytics } from "../api/analyticsApi";

const Analytics = () => {

    const [analytics,setAnalytics]=useState(null);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        fetchAnalytics();

    },[]);

    async function fetchAnalytics(){

        try{

            const response=await getAnalytics();

            setAnalytics(response.data.data);

        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }

    }

    if(loading){

        return <h2 style={{color:"white"}}>Loading...</h2>

    }

    return(

        <div className="analytics-page">

            <div className="analytics-container">

                <AnalyticsHero/>

                <AnalyticsCards analytics={analytics}/>

                <AnalyticsCharts analytics={analytics}/>

                <AnalyticsActivity analytics={analytics}/>

                <AnalyticsInsights analytics={analytics}/>

            </div>

        </div>

    )

}

export default Analytics;