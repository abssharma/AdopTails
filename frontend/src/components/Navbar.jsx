import React from 'react'
import { useAuth, logout } from '../auth'
import { NavLink } from 'react-router-dom'

const LoggedInLinks = () => {
    return (
        <>
            <NavLink to = "/" className = {({ isActive }) => isActive ? 
                'text-blue-500' : 'text-white'}>
                    Home
            </NavLink>

            <NavLink to = "/createpet" className = {({ isActive }) => isActive ? 
                'text-blue-500' : 'text-white'}>
                    Add Pet
            </NavLink>

            <a 
                href="#"
                className="text-white hover:text-blue-500"
                onClick={() => {logout()}}
            >
                Log Out
            </a>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
            <NavLink to = "/" className = {({ isActive }) => isActive ? 
                'text-blue-500' : 'text-white'}>
                    Home
            </NavLink>

            <NavLink to = "/signup" className = {({ isActive }) => isActive ? 
                'text-blue-500' : 'text-white'}>
                    Sign Up
            </NavLink>

            <NavLink to = "/login" className = {({ isActive }) => isActive ? 
                'text-blue-500' : 'text-white'}>
                    Log In
            </NavLink>
        </>
    )
}

const Navbar = () => {

    const [logged] = useAuth();

    return (
        <header className = "header">
            <NavLink to = "/land" className = "w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md p-6">
                <p>🐾</p>
            </NavLink>
            <nav>
                <ul className="flex space-x-4">
                    {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
