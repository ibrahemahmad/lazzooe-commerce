import React from 'react';

function HomePage(props) {
    return (
        <div className="text-center d-flex justify-content-center align-items-cente">
            <div className="mt-1">
                <h1>Welcome <br/> to <br/> lezzoo e-commerce Admin Dashboard </h1>
                <hr className="text-danger"/>
                <ol className="text-start">
                    <li>
                        Stores : you can add store into system in page stores , route from Navigator.

                    </li>
                    <li>
                        Categories : you can add Category into store and system in page Categories , route from
                        Navigator.

                    </li>
                    <li>
                        Products : you can add Products into Category with store for system in page Products , route
                        from Navigator.

                    </li>
                    <li>
                        <h4 className="text-danger">Warning</h4>
                        <ol>
                            <li>
                                <span className="text-danger">Be careful the forms must be valied to be uploaded</span>
                            </li>
                            <li>
                                <span
                                    className="text-danger">    Each photo when you want to upload must be one of them (png,jpg,jpeg)</span>
                            </li>
                            <li>
                                <span className="text-danger">
                                    Please don't accept the duplicate name  from Store and Categories

                                </span>
                            </li>

                        </ol>

                    </li>

                </ol>
            </div>

        </div>
    );
}

export default HomePage;