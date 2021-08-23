import jwtDecode from 'jwt-decode'
import setAuthToken from './setAuthToken'

export function checkIsUserLoggedIn() {
    let getJwtToken = localStorage.getItem('jwtToken');
    if(getJwtToken) {
        const currentTime = Date.now() / 1000;
        let decodedJWtToken = jwtDecode(getJwtToken);
        if(decodedJWtToken.exp < currentTime) {
            localStorage.removeItem('jwtToken')
            setAuthToken(null)
            return false;
        } else {
            console.log(decodedJWtToken);
            return true;
        }
    }
}