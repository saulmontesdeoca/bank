import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import PortfolioHeader from '../../components/PortfolioHeader';
import Portfolio from '../../components/Portfolio';

const Home = () => {
    const [profile, setProfile] = useState({});

    const getProfile = async () => {
        await axios.get('http://localhost:5000/api/profile/me')
            .then(res => {
                setProfile(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <Layout>
            {
                profile &&
                <>
                    <PortfolioHeader profile={profile}/>
                    <Portfolio shares={profile.shares} forwards={profile.forwards} bonds={profile.bonds}/>
                </>
            }
        </Layout>
    );
};

export default Home;