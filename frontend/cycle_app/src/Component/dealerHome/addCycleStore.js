import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import "../Login/reg_css/css/style.css";
class addCycleStore extends React.Component {


    constructor(props) {

        super(props);
        this.state = {

            dealerId: localStorage.getItem("dealerId"),
            token: localStorage.getItem("token"),
            storeContact: '',
            storeAddress: '',
            loggedIn:1
            
        }
        this.addCycleStore = this.addCycleStore.bind(this);


    }
    async addCycleStore() {
        const storeAddress = this.state.storeAddress;
        const storeContact = this.state.storeContact;


        try {

            // Request to cancelBooking

            const req = {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${this.state.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeAddress:storeAddress,
                    storeContact:storeContact,
                    dealerId:this.state.dealerId

                })

            };

            const res = await fetch('http://localhost:5000/addCycleStore', req);
            const response = await res.json();

            if (res.status === 200) {


                alert("Cycle Store Added Successfully")
            }
            else {
                console.log(response.msg);
                alert(response.msg);
                this.setState({loggedIn:0})
                
            }
            
        } catch (err) {
            
            console.log(err);
            this.setState({loggedIn:0})
            
            // alert(err);

        }

    }

    render() {
        if (!this.state.loggedIn) {
            return (<Navigate to="/login" replace={true} />)
        }

        return (
            <div><meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <title>IITK | Cycling-App</title>
                <meta name="description" content />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="css/bootstrap.min.css" />
                <link rel="stylesheet" href="css/bootstrap-theme.min.css" />
                <link rel="stylesheet" href="css/fontAwesome.css" />
                <link rel="stylesheet" href="css/hero-slider.css" />
                <link rel="stylesheet" href="css/owl-carousel.css" />
                <link rel="stylesheet" href="css/style.css" />
                <link href="https://fonts.googleapis.com/css?family=Raleway:100,200,300,400,500,600,700,800,900" rel="stylesheet" />
                {/* Navbar start */}
                <div className="wrap">
                    <header id="header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <button id="primary-nav-button" type="button">Menu</button>
                                    <Link to="/"><div className="logo">
                                        <img src="logo link" alt="IITK-cycling app" />
                                    </div></Link>
                                    <nav id="primary-nav" className="dropdown cf">
                                        <ul className="dropdown menu">
                                            <li><Link to="/dealer/home">Home</Link></li>
                                            <li><Link to="/profile">My Profile</Link></li>
                                        </ul>
                                    </nav>{/* / #primary-nav */}
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="main">
                    <section className="signup" id="Sign-up">
                        <div className="container">
                            <div className="signup-content">
                                <div className="signup-form">
                                    <h2 className="form-title">Add Cycle Store</h2>
                                    <form className="register-form" id="register-form">
                                        <div className="form-group">
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                                            <input type="text" name="name" id="name" placeholder="Store Contact number" value={this.state.storeContact} onChange={(e) => {
                                                this.setState({ storeContact: e.target.value });
                                            }} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                                            <input type="text" name="address" id="address" placeholder="Store Address" value={this.state.storeAddress} onChange={(e) => {
                                                this.setState({ storeAddress: e.target.value });
                                            }} />
                                        </div>


                                        <Link to={"/dealer/home"} onClick={this.addCycleStore} ><div className="form-group form-button">
                                            <button className="form-group form-button p-x10"> Add Cycle Store</button>
                                        </div>
                                        </Link>


                                    </form>
                                </div>
                                <div className="signup-image">
                                    <figure><img src="https://source.unsplash.com/random/292x350/?cycle" alt="sing up image" /></figure>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default addCycleStore;