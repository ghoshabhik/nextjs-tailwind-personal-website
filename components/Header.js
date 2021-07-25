import Link from 'next/link'
import {useTheme} from 'next-themes'
import { useState, useEffect } from 'react'
import { FaSun, FaMoon } from "react-icons/fa";


export default function Header() {

  const {theme, setTheme} = useTheme()
  const [currentTheme, setCurrentTheme] = useState('light')
  const [navBar, setNavBar] = useState(false)

  useEffect(() => {

    const handleScroll = () => {
      if(window.scrollY > 40){
        setNavBar(true)
      } else{
        setNavBar(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
  })

  return (
    <header>
      <div className="lg:w-3/4 mx-auto px-10 py-5">
        {/* flex justify-between flex-col lg:flex-row items-center bg-red-200  */}
        <div className={navBar ? 'fixed top-0 lg:w-3/4 px-10 py-2 z-10 backdrop-filter backdrop-blur-lg' : 
        ''}>
            <div className="flex justify-between flex-col lg:flex-row items-center">
            <Link href='/' passHref>
                <h2 className="text-4xl md:text-5xl font-sans text-gray-700 dark:text-gray-200 font-light cursor-pointer">PaperScripted</h2>
            </Link>
            <div className="flex space-x-8 justify-between mt-3 md:mt-1">
            <button onClick={() => { 
              setTheme(theme === 'dark' ? 'light' : 'dark')
              setCurrentTheme(theme === 'dark' ? 'light' : 'dark')
              }}>{currentTheme === 'dark' ? <FaSun /> : <FaMoon />}</button>
                {/* <Link href='/dashboard' passHref>
                <span className="cursor-pointer">
                    Dashboard
                </span>
                </Link> */}
                <Link href='/blogs' passHref>
                <span className="cursor-pointer">
                    Blog
                </span>
                </Link>
                {/* <span className="cursor-pointer">
                    About
                </span> */}
                <Link href='/' passHref>
                <span className="cursor-pointer">
                    Home
                </span>
                </Link>
            </div>
          </div>
        </div>
      {/* </nav>   */}
      </div>
    </header>
  )
}