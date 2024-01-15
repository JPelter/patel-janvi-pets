import React from 'react';

import LoginFlow from './LoginFlow';
import Profile from './Profile';

function AccountMain(props) {
    console.log('AccountMain props:', props);
    return (
        <>
            {props.checkedAuth && !props.authenticated && <LoginFlow {...props} />}
            {props.authenticated && <Profile {...props} /> }
        </>
    );
}

export default AccountMain;