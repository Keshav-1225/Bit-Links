"use client"
import React from 'react'
import PillNav from '@/components/PillNav'
import { Label } from 'radix-ui'

const Navbar = () => {
    return (
        <div className='w-full sticky top-0 z-50'>
            <PillNav
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'About', href: '/about' },
                    { label: 'Shorten', href: '/generate' },
                    { label: 'Contact Us', href: '/contact' },
                    { label: 'Github', href: 'https://www.github.com/keshav-1225'},
                ]}
                activeHref="/"
                className="custom-nav"
                ease="power2.easeOut"
                baseColor="#000000"
                pillColor="#ffffff"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#000000"
                initialLoadAnimation={false}
                onMobileMenuClick={""}
            />
        </div>
    )
}

export default Navbar
