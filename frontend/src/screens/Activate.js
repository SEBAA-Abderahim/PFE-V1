  
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import Message from '../components/Message';
import {Form,Button} from 'react-bootstrap'
function Activate({ verify, match }) {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };
    if (verified) {
        return <Redirect to='/login' />
    }
    return (
        <div>
                       <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verifiez votre compte:</h1>

                <Button variant="primary" 
                         onClick={verify_account}
                        style={{ marginTop: '50px' }}
                        type='button'
                >
    Vérifier
   </Button>
            </div>
        </div>
    )
}

export default connect(null, { verify })(Activate);

