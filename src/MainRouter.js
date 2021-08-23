import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AuthContextComponent from './components/context/AuthContext'

const Header = React.lazy(() => import('./components/Header/Header'))
const Home = React.lazy(() => import('./components/Home/Home'))
const SignIn = React.lazy(() => import('./components/SignIn/SignIn'))
const SignUp = React.lazy(() => import('./components/SignUp/SignUp'))
const Footer = React.lazy(() => import('./components/Footer/Footer'))

function MainRouter(props) {
    return (
            <AuthContextComponent>
                <Header />
                <Switch>
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/sign-up" component={SignUp} />
                    <Route path="/" component={Home} />
                </Switch>
                <Footer />
            </AuthContextComponent>
    )
}

export default MainRouter
