import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import PortfolioHeader from '../../components/PortfolioHeader';
import Portfolio from '../../components/Portfolio';

const Home = () => {
    const [profile, setProfile] = useState({});
    const [top, setTop] = useState([]);

    const fetchTop = async () => {
        await axios.get("http://localhost:5000/api/get-top")
        .then(res => {
            console.log(res.data)
            setTop(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getProfile = async () => {
        await axios.get('http://localhost:5000/api/profile/me')
            .then(res => {
                setProfile(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getProfile();
        fetchTop();
    }, []);

    return (
        <Layout>
            {
                profile &&
                <>
                    <PortfolioHeader profile={profile}/>
                    <Portfolio shares={profile.shares} forwards={profile.forwards}/>
                </>
            }
        </Layout>
    );
};

export default Home;