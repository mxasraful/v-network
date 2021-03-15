import React from 'react';

const Banner = () => {
    return (
        <section className="bannerMain">
            <div className="container">
                <br/><br/>
                <h1 className="bannerTitle text-center">I grow by helping people in need.</h1>
                <br/>
                <form action="" className="bannerSearchForm">
                    <input className='form-control form-control-lg bannerSearchInput' placeholder="Search...." type="text" name="" id=""/>
                    <input className='btn btn-primary btn-lg bannerSearchSubmitBtn' type="submit" value="Search"/>
                </form>
            </div>
        </section>
    );
};

export default Banner;