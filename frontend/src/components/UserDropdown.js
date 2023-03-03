import { useRef, useEffect, useContext, useState, createContext } from 'react';
import { FormControl, InputLabel, NativeSelect, Select, MenuItem } from '@mui/material';

export default function UserDropdown() {
    // const [option, setOption] = useState({
    //     value: 0
    // });      
    let option = 0;  

    function handleSelect(opt) {
        option = opt?.target?.value;

        // setOption(opt?.target?.value);
        console.log(option);
        if (option === 10) {
            //go to saved models
            console.log("going to user's saved models");
        } else if (option === 20) {
            //sign out
            console.log("signing out");
        }
    }

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
    }

    // function signOut() {
    //     var auth2 = gapi.auth2.getAuthInstance();
    //     auth2.signOut().then(function() {
    //         console.log("User signed out.");
    //     });
    // }
    
    return (
        <div id="user-dropdown">
            <FormControl id="user-dropdown-form" style={{minWidth: 150}}>
                <InputLabel 
                    id="user-dropdown-label" 
                    fullWidth={true}
                >
                    User Options
                </InputLabel>
                <Select
                    id="select-user-dropdown"
                    label="UserName"
                    autoWidth={true}
                    value={option}
                    onChange={handleSelect}
                >
                    <MenuItem value={10}>Saved Models</MenuItem>
                    <MenuItem value={20}>Sign Out</MenuItem>
                </Select>

            </FormControl>
        </div>
    );
}